import {
  getAction,
  patchAction,
  postAction,
  requestBody,
  restController,
  RestRouter
} from '@e22m4u/ts-rest-router';

import {
  UserModel,
  AuthService,
  AuthSession,
  UserLookupWithPassword,
  USER_LOOKUP_WITH_PASSWORD_SCHEMA,
} from '@e22m4u/ts-rest-router-auth';

import http from 'http';
import {Service, ServiceContainer} from '@e22m4u/js-service';
import {DatabaseSchema, WithoutId} from '@e22m4u/ts-repository';
import {requestBodyWithModel} from '@e22m4u/ts-rest-router-repository';

const app = new ServiceContainer();
const router = app.get(RestRouter);
const dbs = app.get(DatabaseSchema);

dbs.defineDatasource({
  name: 'memory',
  adapter: 'memory',
});

const authService = app.get(AuthService);
authService.registerModels({datasource: 'memory'});
authService.registerRequestHooks();

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
  console.log(cyan, 'List users:', `curl http://${host}:${port}/users | jq`);
  console.log(cyan, 'Register a new user:',
    `curl -X POST http://${host}:${port}/users/register `
      + `-H "content-type: application/json" `
      + `-d '{"username": "andrew", "password": "andrewPass123"}' `
      + `| jq`,
  );
  console.log(cyan, 'Login with password:',
    `curl -X POST http://${host}:${port}/users/login `
      + `-H "content-type: application/json" `
      + `-d '{"username": "andrew", "password": "andrewPass123"}' `
      + `| jq`,
  );
  console.log(cyan, 'Get current user:',
    `curl http://${host}:${port}/users/whoAmI `
      + `-H "content-type: application/json" `
      + `-H "authorization: JWT_TOKEN_FROM_LOGIN" `
      + `| jq`,
  );
  console.log(cyan, 'Update current user:',
    `curl -X PATCH http://${host}:${port}/users/profile `
      + `-H "content-type: application/json" `
      + `-H "authorization: JWT_TOKEN_FROM_LOGIN" `
      + `-d '{"firstName": "Andrew", "age": 27}' `
      + `| jq`,
  );
  console.log(cyan, 'Logout:',
    `curl http://${host}:${port}/users/logout `
      + `-H "content-type: application/json" `
      + `-H "authorization: JWT_TOKEN_FROM_LOGIN" `
      + `| jq`,
  );
});