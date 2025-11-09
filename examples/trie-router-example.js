import http from 'http';
import {ServiceContainer} from '@e22m4u/js-service';
import {DatabaseSchema} from '@e22m4u/js-repository';
import {HttpMethod, RouterHookType, TrieRouter} from '@e22m4u/js-trie-router';

import {
  UserModel,
  AuthService,
  AuthSession,
  USER_MODE_DEF,
  ROLE_MODEL_DEF,
  ACCESS_TOKEN_MODEL_DEF,
} from '@e22m4u/js-repository-auth-service';

const app = new ServiceContainer();
const router = app.get(TrieRouter);
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
  const authSession = await authService.createAuthSession(ctx.req);
  ctx.container.set(AuthSession, authSession);
});

// GET /users
router.defineRoute({
  method: HttpMethod.GET,
  path: '/users',
  handler({container}) {
    const dbs = container.get(DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    return userRep.find();
  },
});

// POST /users/register
router.defineRoute({
  method: HttpMethod.POST,
  path: '/users/register',
  handler({container, body}) {
    const authService = container.getRegistered(AuthService);
    authService.requireAnyLoginId(body);
    return authService.createUser(body);
  },
});

// POST /users/login
router.defineRoute({
  method: HttpMethod.POST,
  path: '/users/login',
  async handler({container, body}) {
    const authService = container.getRegistered(AuthService);
    const user = await authService.findUserByLoginIds(body);
    if (user.password) {
      await authService.verifyPassword(body.password || '', user.password);
    }
    const accessToken = await authService.createAccessToken(user.id);
    const {token, expiresAt} = await authService.issueJwt(accessToken);
    const {password, ...userDto} = user;
    return {token, expiresAt, user: userDto};
  },
});

// GET /users/findMe
router.defineRoute({
  method: HttpMethod.GET,
  path: '/users/findMe',
  handler({container}) {
    const session = container.getRegistered(AuthSession);
    return session.getUser();
  },
});

// PATCH /users/profile
router.defineRoute({
  method: HttpMethod.PATCH,
  path: '/users/profile',
  handler({container, body}) {
    const session = container.getRegistered(AuthSession);
    const authService = container.getRegistered(AuthService);
    authService.requireAnyLoginId(body, true);
    return authService.updateUser(session.getUserId(), body);
  },
});

// GET /users/logout
router.defineRoute({
  method: HttpMethod.GET,
  path: '/users/logout',
  async handler({container}) {
    const session = container.getRegistered(AuthSession);
    const accessTokenId = session.getAccessTokenId();
    const authService = container.getRegistered(AuthService);
    const result = await authService.removeAccessTokenById(accessTokenId);
    return {success: result};
  },
});

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
  // Register user
  console.log('');
  console.log(cyan, 'Register user:');
  console.log(`  curl -X POST http://${host}:${port}/users/register \\`);
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