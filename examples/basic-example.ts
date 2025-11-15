import http from 'http';
import {Service, ServiceContainer} from '@e22m4u/js-service';

import {
  model,
  property,
  DataType,
  WithoutId,
  DatabaseSchema,
} from '@e22m4u/ts-repository';

import {
  getAction,
  postAction,
  patchAction,
  requestField,
  restController,
  RestRouter,
} from '@e22m4u/ts-rest-router';

import {
  requestBodyWithModel,
  responseBodyWithModel,
} from '@e22m4u/ts-rest-router-repository';

import {
  AuthService,
  AuthSession,
  BaseUserModel,
  BaseRoleModel,
  BaseAccessTokenModel,
  UserDataService,
} from '../src/index.js'; // @e22m4u/ts-repository-auth-service

// инициализация основных сервисов
const app = new ServiceContainer(); // сервис-контейнер
const router = app.get(RestRouter); // маршрутизатор
const dbs = app.get(DatabaseSchema); // схема баз данных

// определение источник данных
dbs.defineDatasource({
  name: 'main',
  adapter: 'memory',
});

// создание моделей на основе базовых классов с указанием
// названия источника данных 'main' в декораторе @model
// и дополнительного поля `username` в модели UserModel

// модель роли остается без изменений
@model({datasource: 'main'})
class RoleModel extends BaseRoleModel {}

// модель пользователя расширяется полем `username`
@model({datasource: 'main'})
class UserModel extends BaseUserModel {
  @property({
    type: DataType.STRING,
    required: true,
    unique: true,
  })
  username!: string;
}

// модель токена также без изменений
@model({datasource: 'main'})
class AccessTokenModel extends BaseAccessTokenModel {}

// регистрация моделей в схеме баз данных
dbs.defineModelByClass(RoleModel);
dbs.defineModelByClass(UserModel);
dbs.defineModelByClass(AccessTokenModel);

// добавление pre-handler хука, который будет
// создавать сессию для каждого запроса
router.addPreHandler(async ctx => {
  const authService = ctx.container.get(AuthService);
  const authSession = await authService.createAuthSession(ctx.request);
  ctx.container.set(AuthSession, authSession);
});

@restController('users')
class UserController extends Service {
  // GET /users
  @getAction()
  find() {
    const dbs = this.getService(DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    return userRep.find();
  }

  // POST /users/create
  @postAction('create')
  @responseBodyWithModel(UserModel)
  async create(
    @requestBodyWithModel(UserModel, {required: true})
    body: WithoutId<UserModel>,
  ) {
    const authService = this.getRegisteredService(AuthService);
    const userDataService = this.getService(UserDataService);
    userDataService.validateUsername(body.username);
    userDataService.validatePassword(body.password);
    await authService.ensureUserDoesNotExist<UserModel>({
      username: body.username,
    });
    return authService.createUser(body);
  }

  // POST /users/login
  @postAction('login')
  async login(
    @requestField('username', {
      type: DataType.STRING,
      required: true,
    })
    username: string,
    @requestField('password', {
      type: DataType.STRING,
      required: true,
    })
    password: string,
  ) {
    const authService = this.getRegisteredService(AuthService);
    const user = await authService.findUserBeforeLogin<UserModel>({username});
    await authService.verifyPassword(password, user.password);
    const accessToken = await authService.createAccessToken(user.id);
    const {token, expiresAt} = await authService.issueJwt(accessToken);
    delete user.password;
    return {token, expiresAt, user};
  }

  // GET /users/findMe
  @getAction('findMe')
  @responseBodyWithModel(UserModel)
  findMe() {
    const session = this.getRegisteredService(AuthSession);
    return session.getUser();
  }

  // PATCH /users/profile
  @patchAction('profile')
  @responseBodyWithModel(UserModel)
  async patchProfile(
    @requestBodyWithModel(UserModel, {
      required: true,
      partial: true,
    })
    body: WithoutId<UserModel>,
  ) {
    const session = this.getRegisteredService(AuthSession);
    const authService = this.getRegisteredService(AuthService);
    const userId = session.getUserId();
    if ('username' in body) {
      const userDataService = this.getService(UserDataService);
      userDataService.validateUsername(body.username);
      await authService.ensureUserDoesNotExist<UserModel>(
        {username: body.username},
        userId,
      );
    }
    return authService.updateUser(userId, body);
  }

  // GET /users/logout
  @getAction('logout')
  async logout() {
    const session = this.getRegisteredService(AuthSession);
    const accessTokenId = session.getAccessTokenId();
    const authService = this.getRegisteredService(AuthService);
    const result = await authService.removeAccessTokenById(accessTokenId);
    return {success: result};
  }
}

// добавление контроллера в маршрутизатор
router.addController(UserController);

// создание экземпляра сервера
// и установка слушателя запросов
const server = new http.Server();
server.on('request', router.requestListener);

// прослушивание входящих запросов
// на указанный адрес и порт
const port = 3000;
const host = '0.0.0.0';
server.listen(port, host, function () {
  const cyan = '\x1b[36m%s\x1b[0m';
  console.log(cyan, 'Server listening on', `http://${host}:${port}`);
  // List users
  console.log('');
  console.log(cyan, 'List users:');
  console.log(`  curl http://${host}:${port}/users | jq`);
  // Create user
  console.log('');
  console.log(cyan, 'Create user:');
  console.log(`  curl -X POST http://${host}:${port}/users/create \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(
    `    -d '{"username": "andrew", "password": "andrewPass123"}' \\`,
  );
  console.log(`    | jq;`);
  // Login
  console.log('');
  console.log(cyan, 'Login:');
  console.log(`  curl -X POST http://${host}:${port}/users/login \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(
    `    -d '{"username": "andrew", "password": "andrewPass123"}' \\`,
  );
  console.log(`    | jq;`);
  // Current user
  console.log('');
  console.log(cyan, 'Current user:');
  console.log(`  curl http://${host}:${port}/users/findMe \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(`    -H "authorization: JWT_TOKEN_FROM_LOGIN" \\`);
  console.log(`    | jq;`);
  // Update current user
  console.log('');
  console.log(cyan, 'Update current user:');
  console.log(`  curl -X PATCH http://${host}:${port}/users/profile \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(`    -H "authorization: JWT_TOKEN_FROM_LOGIN" \\`);
  console.log(`    -d '{"firstName": "Andrew", "age": 27}' \\`);
  console.log(`    | jq;`);
  // Logout
  console.log('');
  console.log(cyan, 'Logout:');
  console.log(`  curl http://${host}:${port}/users/logout \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(`    -H "authorization: JWT_TOKEN_FROM_LOGIN" \\`);
  console.log(`    | jq`);
});
