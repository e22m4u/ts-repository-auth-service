## @e22m4u/js-repository-auth-service

Сервис авторизации с ролевой моделью для
[@e22m4u/js-repository](https://www.npmjs.com/package/@e22m4u/ts-repository).

## Оглавление

- [Установка](#установка)
- [Использование](#использование)
  - [Регистрация пользователя](#регистрация-пользователя)
  - [Аутентификация (вход в систему)](#аутентификация-вход-в-систему)
  - [Получение данных текущего пользователя](#получение-данных-текущего-пользователя)
  - [Обновление профиля](#обновление-профиля)
  - [Выход из системы (завершение сессии)](#выход-из-системы-завершение-сессии)
- [AuthService](#authservice)
  - [createUser](#authservicecreateuser)
  - [findUserByLoginIds](#authservicefinduserbyloginids)
  - [verifyPassword](#authserviceverifypassword)
  - [createAccessToken](#authservicecreateaccesstoken)
  - [issueJwt](#authserviceissuejwt)
  - [updateUser](#authserviceupdateuser)
  - [removeAccessTokenById](#authserviceremoveaccesstokenbyid)
  - [requireAnyLoginId](#authservicerequireanyloginid)
- [Модели](#модели)
  - [BaseRoleModel и RoleModel](#baserolemodel-и-rolemodel)
  - [BaseUserModel и UserModel](#baseusermodel-и-usermodel)
  - [BaseAccessTokenModel и AccessTokenModel](#baseaccesstokenmodel-и-accesstokenmodel)
- [Тесты](#тесты)
- [Лицензия](#лицензия)

## Установка

```bash
npm install @e22m4u/js-repository-auth-service
```

Модуль поддерживает ESM и CommonJS стандарты.

*ESM*

```js
import {AuthService} from '@e22m4u/js-repository-auth-service';
```

*CommonJS*

```js
const {AuthService} = require('@e22m4u/ts-rest-router-auth');
```

## Использование

В данном разделе пошагово демонстрируется создание базового, но функционального
приложения с аутентификацией. Каждый следующий фрагмент кода является
логическим продолжением предыдущего, формируя единое приложение.

В примерах используется маршрутизатор
[@e22m4u/js-trie-router](https://www.npmjs.com/package/@e22m4u/js-trie-router),
который можно заменить на любой другой.

#### 1. Инициализация основных сервисов

В основе приложения лежат три ключевых компонента: сервис-контейнер
для управления зависимостями, маршрутизатор для обработки HTTP-запросов
и схема баз данных для работы с моделями. Первым шагом является
их инициализация.

```ts
import {TrieRouter} from '@e22m4u/js-trie-router';
import {ServiceContainer} from '@e22m4u/js-service';
import {DatabaseSchema} from '@e22m4u/js-repository';

const app = new ServiceContainer();  // контейнер
const router = app.get(TrieRouter);  // маршрутизатор
const dbs = app.get(DatabaseSchema); // схема баз данных
```

#### 2. Настройка базы данных и моделей

После получения сервиса для управления схемой баз данных (`dbs`), необходимо
определить, как и где будут храниться данные. Сначала определяется источник
данных (в данном примере *in-memory* база), а затем в нем регистрируются
модели, поставляемые с библиотекой.

```ts
import {
  USER_MODE_DEF,
  ROLE_MODEL_DEF,
  ACCESS_TOKEN_MODEL_DEF,
} from '@e22m4u/js-repository-auth-service';

// определяется источник данных с именем 'main' и адаптером 'memory',
// но реальном приложении здесь могут быть настройки для MongoDB,
// PostgreSQL или другой базы
dbs.defineDatasource({
  name: 'main',
  adapter: 'memory',
});

// каждая модель "привязывается" к ранее определенному источнику данных
dbs.defineModel({...ACCESS_TOKEN_MODEL_DEF, datasource: 'main'});
dbs.defineModel({...ROLE_MODEL_DEF, datasource: 'main'});
dbs.defineModel({...USER_MODE_DEF, datasource: 'main'});
```

#### 3. Создание сессии для каждого запроса

Для определения статуса аутентификации пользователя каждый входящий запрос
должен проверяться на наличие корректного *JWT (JSON Web Token)*. Эта задача
решается добавлением глобального `PRE_HANDLER` (перехватчика). Данный хук
выполняется перед каждым маршрутом, создает экземпляр `AuthSession` и помещает
его в *request-scoped* контейнер. Таким образом, объект сессии становится
доступным внутри любого контроллера во время обработки запроса.

```ts
router.addHook(RouterHookType.PRE_HANDLER, async ctx => {
  // для каждого запроса извлекается request-scoped экземпляр AuthService
  // (экземпляр создается автоматически в методе `container.get`)
  const authService = ctx.container.get(AuthService);
  // на основе токена из контекста запроса (если он есть) создается сессия
  const authSession = await authService.createAuthSession(ctx);
  // созданная сессия сохраняется в контейнере запроса
  // для доступа в обработчиках маршрута
  ctx.container.set(AuthSession, authSession);
});
```

#### 4. Запуск HTTP-сервера

Финальным шагом является создание и запуск HTTP-сервера Node.js. Маршрутизатор,
настроенный на предыдущих шагах, передается ему в качестве обработчика запросов.
После этого сервер готов принимать входящие соединения.

```ts
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
  console.log(cyan, 'Server listening on ', `${host:port}`);
});
```

Теперь, когда базовая структура приложения настроена и сервер готов обрабатывать
входящие запросы, можно перейти к реализации таких операций как регистрация
и вход в систему.

### Регистрация пользователя

Создание новых пользователей выполняется методом `createUser` сервиса
`AuthService`. Метод реализует логику проверки формата идентификаторов
входа (`username`, `email` и `phone`), их проверку на дубликаты
и хеширование пароля (при наличии). Ниже приводится пример реализации
маршрута для регистрации нового пользователя.

```ts
// POST /users/register
router.defineRoute({
  method: HttpMethod.POST,
  path: '/users/register',
  handler({container, body}) {
    // получение request-scoped экземпляра AuthService
    const authService = container.getRegistered(AuthService);
    // проверка наличия хотя бы одного идентификатора входа
    authService.requireAnyLoginId(body);
    // вызов метода создания пользователя
    return authService.createUser(body);
  },
});
```

Перед созданием пользователя рекомендуется вызвать метод `requireAnyLoginId`
сервиса `AuthService`, чтобы убедиться в наличии, по крайней мере, одного
идентификатора входа.

### Аутентификация (вход в систему)

Процесс аутентификации заключается в проверке учетных данных пользователя и,
в случае успеха, в создании сессии с выпуском *JWT (JSON Web Token)*. Эта логика
инкапсулирована в сервисе `AuthService` и включает в себя поиск пользователя,
проверку пароля и генерацию токена. Ниже приводится пример реализации маршрута
для входа в систему.

```js
// POST /users/login
router.defineRoute({
  method: HttpMethod.POST,
  path: '/users/login',
  async handler({container, body}) {
    // получение request-scoped экземпляра AuthService
    const authService = container.getRegistered(AuthService);
    // поиск пользователя по одному из идентификаторов
    const user = await authService.findUserByLoginIds(body);
    // проверка пароля
    if (user.password) {
      await authService.verifyPassword(body.password || '', user.password);
    }
    // создание токена доступа (в базе данных)
    const accessToken = await authService.createAccessToken(user.id);
    // генерация JWT
    const {token, expiresAt} = await authService.issueJwt(accessToken);
    // удаление пароля перед отправкой
    const {password, ...userDto} = user;
    // возврат токена и данных пользователя
    return {token, expiresAt, user: userDto};
  },
});
```

### Получение данных текущего пользователя

Для получения информации о пользователе текущей сессии используется
сервис `AuthSession`. Сервис автоматически создается для каждого запроса
и содержит данные пользователя, если в запросе был предоставлен корректный JWT.
Метод `session.getUser()` возвращает объект пользователя или выбрасывает ошибку
`401 Unauthorized`, если сессия анонимна.

```js
// GET /users/findMe
router.defineRoute({
  method: HttpMethod.GET,
  path: '/users/findMe',
  async handler({container}) {
    // получение request-scoped экземпляра AuthSession
    const session = container.getRegistered(AuthSession);
    // возврат данных пользователя из сессии
    return session.getUser();
  },
});
```

### Обновление профиля

Обновление данных пользователя выполняется методом `authService.updateUser`.
В качестве первого аргумента данный метод принимает идентификатор пользователя,
а вторым - объект с новыми данными. Идентификатор текущего пользователя
извлекается из сессии с помощью `session.getUserId()`, что гарантирует
правильного владельца.

```js
// PATCH /users/profile
router.defineRoute({
  method: HttpMethod.PATCH,
  path: '/users/profile',
  async handler({container, body}) {
    const session = container.getRegistered(AuthSession);
    const authService = container.getRegistered(AuthService);
    // проверка наличия хотя бы одного идентификатора входа (в режиме partial)
    authService.requireAnyLoginId(body, true);
    // вызов метода обновления пользователя
    return authService.updateUser(session.getUserId(), body);
  },
});
```

### Выход из системы (завершение сессии)

Процесс выхода из системы заключается в удалении текущего токена доступа
из базы данных. Метод `authService.removeAccessTokenById` принимает
идентификатор токена (не сам JWT), который можно получить из сессии
через `session.getAccessTokenId()`. После удаления токена из базы
все последующие запросы с этим JWT будут недействительны.

```js
// GET /users/logout
router.defineRoute({
  method: HttpMethod.GET,
  path: '/users/logout',
  async handler({container}) {
    const session = container.getRegistered(AuthSession);
    const authService = container.getRegistered(AuthService);
    // получение идентификатора токена доступа из сессии
    const accessTokenId = session.getAccessTokenId();
    // удаление токена из базы данных
    const result = await authService.removeAccessTokenById(accessTokenId);
    return {success: result};
  },
});
```

## AuthService

`AuthService` является центральным компонентом модуля, предоставляющим всю
основную логику для управления пользователями, аутентификации, генерации
токенов и управления сессиями. Ниже приводится список методов его экземпляра.

### authService.createUser

Создает нового пользователя, выполняя все необходимые проверки и преобразования
данных.

Сигнатура:

```ts
createUser<T extends BaseUserModel>(
  inputData: WithOptionalId<T>,
  filter?: ItemFilterClause<T>,
): Promise<T>;
```
Процесс выполнения:

- Проверка формата  
  *проверяет формат `username`, `email`, `phone` и `password`;*
- Проверка уникальности  
  *проверяет дубликаты `username`, `email` и `phone` других пользователей;*
- Хеширование пароля  
  *безопасно хеширует пароль с использованием `bcrypt`;*
- Сохранение  
  *создает новую запись пользователя в базе данных;*

Метод возвращает `Promise`, который разрешается объектом созданного
пользователя.

Пример:

```ts
const newUser = await authService.createUser({
  username: 'testUser',
  email: 'test@example.com',
  password: 'Password123',
});
```

### authService.findUserByLoginIds

Осуществляет поиск пользователя по одному из его идентификаторов: `username`,
`email` или `phone`. Поиск по `username` и `email` по умолчанию
регистронезависимый.

Сигнатура:

```ts
findUserByLoginIds<T extends BaseUserModel>(
  lookup: LoginIdsFilter,
  include?: IncludeClause<T>,
  silent?: boolean,
): Promise<T | undefined>;
```

Параметры:

- `lookup`  
  *объект полем `username`, `email` или `phone`;*

- `silent` (опционально, по умолчанию `false`)  
  *если `true` и пользователь не найден, метод вернет `undefined`;*  
  *если `false`, будет выброшена ошибка `400 Bad Request`;*

Пример:

```ts
// используется при логине, выбрасывает ошибку если пользователь не найден
const user = await authService.findUserByLoginIds({username: 'testUser'});

// используется для проверки, не выбрасывает ошибку
const maybeUser = await authService.findUserByLoginIds(
  {email: 'test@example.com'},
  undefined,
  true,
);
```

### authService.verifyPassword

Сравнивает предоставленный пароль с хешем, хранящимся в базе данных.

Сигнатура:
```ts
verifyPassword(
  password: string,
  hash: string,
  silent?: boolean,
): Promise<boolean>;
```

Параметры:

- `password`  
  *пароль в открытом виде, введенный пользователем;*
- `hash`  
  *хеш пароля из объекта пользователя;*
- `silent` (опционально, по умолчанию `false`)  
  *если `true` и пароли не совпадают, метод вернет `false`;*  
  *если `false`, будет выброшена ошибка `400 Bad Request`;*

Пример:

```ts
// выбросит ошибку, если пароль неверный
await authService.verifyPassword('Password123', user.password);
```

### authService.createAccessToken

Создает запись о токене доступа в базе данных. Это необходимо для управления
сессиями и реализации механизма выхода из системы. Идентификатор созданной
записи используется как `tid` (Token ID) в полезной нагрузке JWT.

Сигнатура:

```ts
createAccessToken<T extends BaseAccessTokenModel>(
  ownerId: string | number,
  patch?: Partial<T>,
): Promise<T>
```

Параметры:

- `ownerId`  
  *ID пользователя, для которого создается токен;*
- `patch` (опционально)  
  *объект дополнительных свойств, который будет записан в данные ключа;*

Пример:

```ts
// создание новой записи о токене и сохранение в базу данных
const accessToken = await authService.createAccessToken(user.id);
```

### authService.issueJwt

Генерирует JWT на основе ранее созданного `AccessToken`.

Сигнатура:

```ts
issueJwt(
  accessToken: BaseAccessTokenModel,
): Promise<{token: string, expiresAt: string}>
```

Параметры:

- `accessToken`  
  *объект токена доступа, полученный из метода `createAccessToken`*

Процесс выполнения:

1. Формирует полезную нагрузку с полями `uid` (User ID) и `tid` (Token ID).
2. Подписывает токен с помощью `jwtSecret`.
3. Устанавливает время жизни (`exp`) на основе опции `jwtTtl`.

Пример:

```ts
const {token, expiresAt} = await authService.issueJwt(accessToken);
```

### authService.updateUser

Обновляет данные существующего пользователя. Метод выполняет те же валидации
формата и уникальности, что и `createUser`, для всех полей, которые переданы
в `inputData`.

Сигнатура:

```ts
updateUser<T extends BaseUserModel>(
  userId: T['id'],
  inputData: Partial<T>,
  filter?: ItemFilterClause<T>,
): Promise<T>
```

Параметры:

- `userId`  
  *ID пользователя, которого нужно обновить;*
- `inputData`  
  *объект с полями для обновления;*

Пример:

```ts
const updatedUser = await authService.updateUser(
  session.getUserId(),
  {email: 'new.email@example.com'},
);
```

### authService.removeAccessTokenById

Удаление записи `AccessToken` из базы данных. Это основной механизм
для реализации выхода из системы.

Сигнатура:

```ts
removeAccessTokenById(accessTokenId: string): Promise<boolean>;
```

Параметры:

- `accessTokenId`  
  *ID токена доступа, который необходимо удалить,*  
  *этот ID можно получить из сессии (`session.getAccessTokenId()`);*

Пример:

```ts
const accessTokenId = session.getAccessTokenId();
const result = await authService.removeAccessTokenById(accessTokenId);
// result === true, если токен был успешно удален
```

### authService.requireAnyLoginId

Вспомогательный метод валидации, который проверяет наличие в переданном
объекте хотя бы одного из полей для входа (`username`, `email` или `phone`).
Если ни одно из полей не найдено или их значения пустые, выбрасывается ошибка.

Сигнатура:

```ts
requireAnyLoginId(
  data: Record<string, unknown>,
  partial = false,
): void;
```

Параметры:

- `data`  
  *объект для проверки (обычно `request.body`);*
- `partial = false` (по умолчанию)  
  *проверяются все три поля (`username`, `email`, `phone`),  
  и хотя бы одно должно быть непустым (используется при регистрации);*
- `partial = true`  
  *проверяются только те поля, которые присутствуют в объекте `data`
  (используется при обновлении профиля, когда пользователь может изменить
  только одно из полей);*

## Модели

Ниже приводятся определения предустановленных моделей.

### BaseRoleModel и RoleModel

```ts
import {
  model,
  property,
  DataType,
  PropertyUniqueness,
} from '@e22m4u/ts-repository';

/**
 * Base role model.
 */
@model()
export class BaseRoleModel<IdType = number | string> {
  @property({
    type: DataType.ANY,
    primaryKey: true,
  })
  id!: IdType;

  @property({
    type: DataType.STRING,
    required: true,
    unique: PropertyUniqueness.STRICT,
  })
  name?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  createdAt?: string;
}

/**
 * Role model.
 */
@model()
export class RoleModel<
  IdType = number | string,
> extends BaseRoleModel<IdType> {}

```

### BaseUserModel и UserModel

```js
import {
  model,
  property,
  relation,
  DataType,
  RelationType,
  PropertyUniqueness,
} from '@e22m4u/ts-repository';

import {
  noInput,
  noOutput,
} from '@e22m4u/ts-projection';

import {
  RoleModel,
  BaseRoleModel,
} from './role-model.js';

/**
 * Base user model.
 */
@model()
export class BaseUserModel<
  IdType = number | string,
  RoleType extends BaseRoleModel = BaseRoleModel,
> {
  @property({
    type: DataType.ANY,
    primaryKey: true,
  })
  id!: IdType;

  @property({
    type: DataType.STRING,
    unique: PropertyUniqueness.SPARSE,
    default: '',
  })
  username?: string;

  @property({
    type: DataType.STRING,
    unique: PropertyUniqueness.SPARSE,
    default: '',
  })
  email?: string;

  @property({
    type: DataType.STRING,
    unique: PropertyUniqueness.SPARSE,
    default: '',
  })
  phone?: string;

  @property({
    type: DataType.STRING,
    default: '',
  })
  @noOutput()
  password?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  @noInput()
  createdAt?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  updatedAt?: string;

  @property({
    type: DataType.ARRAY,
    itemType: DataType.ANY,
    default: () => [],
  })
  roleIds?: RoleType['id'][];

  @relation({
    type: RelationType.REFERENCES_MANY,
    model: RoleModel.name,
    foreignKey: 'roleIds',
  })
  roles?: RoleType[];
}

/**
 * User model.
 */
@model()
export class UserModel<
  IdType = number | string,
  RoleModel extends BaseRoleModel = BaseRoleModel,
> extends BaseUserModel<IdType, RoleModel> {}

```

### BaseAccessTokenModel и AccessTokenModel

```js
import {
  model,
  property,
  relation,
  DataType,
  RelationType,
} from '@e22m4u/ts-repository';

import {
  UserModel,
  BaseUserModel,
} from './user-model.js';

/**
 * Base access token model.
 */
@model()
export class BaseAccessTokenModel<
  IdType = number | string,
  UserType extends BaseUserModel = BaseUserModel,
> {
  @property({
    type: DataType.ANY,
    primaryKey: true,
  })
  id!: IdType;

  @property({
    type: DataType.STRING,
    default: '',
  })
  userAgent?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  createdAt?: string;

  @property({
    type: DataType.ANY,
    required: true,
  })
  ownerId?: UserType['id'];

  @relation({
    type: RelationType.BELONGS_TO,
    model: UserModel.name,
    foreignKey: 'ownerId',
  })
  owner?: UserType;
}

/**
 * Access token model.
 */
@model()
export class AccessTokenModel<
  IdType = number | string,
  UserType extends BaseUserModel = BaseUserModel,
> extends BaseAccessTokenModel<IdType, UserType> {}

```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
