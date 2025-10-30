import http from 'http';
import {Service, ServiceContainer} from '@e22m4u/js-service';
import {DatabaseSchema, WithoutId} from '@e22m4u/ts-repository';
import {requestBodyWithModel} from '@e22m4u/ts-rest-router-repository';

import {
  UserModel,
  AuthService,
  AuthSession,
  UserLookupWithPassword,
  USER_LOOKUP_WITH_PASSWORD_SCHEMA,
  ACCESS_TOKEN_MODEL_DEF,
  ROLE_MODEL_DEF,
  USER_MODE_DEF,
  AuthLocalizer,
} from '../src/index.js'; // @e22m4u/ts-rest-router-auth

import {
  getAction,
  patchAction,
  postAction,
  requestBody,
  restController,
  RestRouter,
  RouterHookType,
} from '@e22m4u/ts-rest-router';

const app = new ServiceContainer();
const router = app.get(RestRouter);
const dbs = app.get(DatabaseSchema);

dbs.defineDatasource({
  name: 'main',
  adapter: 'memory',
});

dbs.defineModel({...ACCESS_TOKEN_MODEL_DEF, datasource: 'main'});
dbs.defineModel({...ROLE_MODEL_DEF, datasource: 'main'});
dbs.defineModel({...USER_MODE_DEF, datasource: 'main'});

router.addHook(RouterHookType.PRE_HANDLER, async ctx => {
  const authService = ctx.container.get(AuthService);
  const authSession = await authService.createAuthSession(ctx);
  const authLocalizer = authService.getService(AuthLocalizer);
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

  // POST /users/register
  @postAction('register')
  register(
    @requestBodyWithModel(UserModel, {required: true})
    body: WithoutId<UserModel>,
  ) {
    const authService = this.getRegisteredService(AuthService);
    authService.requireAnyLoginId(body);
    return authService.createUser(body);
  }

  // POST /users/login
  @postAction('login')
  async login(
    @requestBody(USER_LOOKUP_WITH_PASSWORD_SCHEMA)
    body: UserLookupWithPassword,
  ) {
    const authService = this.getRegisteredService(AuthService);
    const user = await authService.findUserByLoginIds(body);
    if (user.password)
      await authService.verifyPassword(body.password || '', user.password);
    const accessToken = await authService.createAccessToken(user.id);
    const {token, expiresAt} = await authService.issueJwt(accessToken);
    return {token, expiresAt, user};
  }

  // GET /users/whoAmI
  @getAction('whoAmI')
  whoAmI() {
    const session = this.getRegisteredService(AuthSession);
    return session.getUser();
  }

  // PATCH /users/profile
  @patchAction('profile')
  patchProfile(
    @requestBodyWithModel(UserModel, {required: true})
    body: WithoutId<UserModel>,
  ) {
    const session = this.getRegisteredService(AuthSession);
    const authService = this.getRegisteredService(AuthService);
    authService.requireAnyLoginId(body, true);
    return authService.updateUser(session.getUserId(), body);
  }

  // PATCH /users/logout
  @getAction('logout')
  logout() {
    const session = this.getRegisteredService(AuthSession);
    const accessTokenId = session.getAccessTokenId();
    const authService = this.getRegisteredService(AuthService);
    return authService.removeAccessTokenById(accessTokenId);
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
  console.log(cyan, 'Server listening on port:', port);
  // List users
  console.log(cyan, 'List users:');
  console.log(`  curl http://${host}:${port}/users | jq`);
  // Register user
  console.log(cyan, 'Register user:');
  console.log(`  curl -X POST http://${host}:${port}/users/register \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(
    `    -d '{"username": "andrew", "password": "andrewPass123"}' \\`,
  );
  console.log(`    | jq;`);
  // Login
  console.log(cyan, 'Login:');
  console.log(`  curl -X POST http://${host}:${port}/users/login \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(
    `    -d '{"username": "andrew", "password": "andrewPass123"}' \\`,
  );
  console.log(`    | jq;`);
  // Current user
  console.log(cyan, 'Current user:');
  console.log(`  curl http://${host}:${port}/users/whoAmI \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(`    -H "authorization: JWT_TOKEN_FROM_LOGIN" \\`);
  console.log(`    | jq;`);
  // Update current user
  console.log(cyan, 'Update current user:');
  console.log(`  curl -X PATCH http://${host}:${port}/users/profile \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(`    -H "authorization: JWT_TOKEN_FROM_LOGIN" \\`);
  console.log(`    -d '{"firstName": "Andrew", "age": 27}' \\`);
  console.log(`    | jq;`);
  // Logout
  console.log(cyan, 'Logout:');
  console.log(`  curl http://${host}:${port}/users/logout \\`);
  console.log(`    -H "content-type: application/json" \\`);
  console.log(`    -H "authorization: JWT_TOKEN_FROM_LOGIN" \\`);
  console.log(`    | jq`);
});
