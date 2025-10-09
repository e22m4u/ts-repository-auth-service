## @e22m4u/ts-rest-router-auth

Подключаемый сервис авторизации с ролевой моделью.

Модуль встраивается в связку:

- [@e22m4u/js-service](https://www.npmjs.com/package/@e22m4u/js-service)
  \- сервис-контейнер (IoC);
- [@e22m4u/ts-rest-router](https://www.npmjs.com/package/@e22m4u/ts-rest-router)
  \- REST-маршрутизатор на основе префиксного дерева;
- [@e22m4u/ts-repository](https://www.npmjs.com/package/@e22m4u/ts-repository)
  \- ORM/ODM для работы с базами данных;

## Оглавление

- [Установка](#установка)
- [Использование](#использование)
  - [Настройка AuthService](#настройка-authservice)
  - [Регистрация пользователя](#регистрация-пользователя)
  - [Аутентификация (вход в систему)](#аутентификация-вход-в-систему)
  - [Получение данных текущего пользователя](#получение-данных-текущего-пользователя)
  - [Обновление профиля](#обновление-профиля)
  - [Выход из системы (завершение сессии)](#выход-из-системы-завершение-сессии)
- [AuthService](#authservice)
  - [registerModels](#authserviceregistermodels)
  - [registerRequestHooks](#authserviceregisterrequesthooks)
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
npm install @e22m4u/ts-rest-router-auth
```

Модуль поддерживает ESM и CommonJS стандарты.

*ESM*

```js
import {AuthService} from '@e22m4u/ts-rest-router-auth';
```

*CommonJS*

```js
const {AuthService} = require('@e22m4u/ts-rest-router-auth');
```

## Использование

Модули `ts-rest-router` и `ts-repository` обычно работают в рамках одного
сервис-контейнера или корневого сервиса (*application*). Ниже рассматривается
первый вариант.

```js
import {RestRouter} from '@e22m4u/ts-rest-router';
import {ServiceContainer} from '@e22m4u/js-service';
import {DatabaseSchema} from '@e22m4u/ts-repository';

const app = new ServiceContainer();
// инъекция маршрутизатора и схемы баз данных
const router = app.get(RestRouter);
const dbs = app.get(DatabaseSchema);

// для примера используется MongoDB адаптер
dbs.defineDatasource({
  name: 'myMongo',
  adapter: 'mongodb',
  // параметры адаптера
  host: '127.0.0.1',
  port: 27017,
  database: 'myDatabase',
});
```

*i. MongoDB адаптер устанавливается отдельно (см. [js-repository-mongodb-adapter](https://www.npmjs.com/package/@e22m4u/js-repository-mongodb-adapter)).*

### Настройка AuthService

Для интеграции сервиса `AuthService` выполняется создание экземпляра
и его инъекция в сервис-контейнер приложения, после чего следуют вызовы
некоторых методов предварительной настройки. Создание экземпляра выполняется
автоматически при запросе данного сервиса методом `app.get()`.

```ts
const authService = app.get(AuthService); // см. 1
authService.registerModels({datasource: 'myMongo'}); // см. 2
authService.registerRequestHooks(); // см. 3
```

1\. На первой строке примера выше выполняется инъекция сервиса авторизации
без дополнительных аргументов. Вторым параметром метода `app.get()` можно
передать объект с настройками, как это показано ниже.

```ts
// создание экземпляра AuthService
// (инъекция сервиса авторизации)
const authService = app.get(AuthService, {
  passwordHashRounds: 12,
  jwtSecret: 'REPLACE_ME!',
  jwtTtl: 14 * 86400, // 14 days
  jwtHeaderName: 'authorization',
  jwtCookieName: 'accessToken',
  jwtQueryParam: 'accessToken',
  sessionUserInclusion: 'roles',
  // usernameFormatValidator,
  // emailFormatValidator,
  // phoneFormatValidator,
  // passwordFormatValidator,
});
```

2\. На второй строке выполняется регистрация [моделей](#Модели) с передачей
параметра `datasource`. В данном параметре требуется указать название
предварительно зарегистрированного
[источника данных](https://www.npmjs.com/package/@e22m4u/js-repository#источник-данных),
где будут храниться роли, пользователи и другие сущности. Ниже приводится
пример определения источника данных и регистрация моделей.

```ts
// регистрация источника данных
dbs.defineDatasource({
  name: 'myMongo',
  adapter: 'mongodb',
  host: '127.0.0.1',
  port: 27017,
  database: 'myDatabase',
});

// регистрация моделей
authService.registerModels({
  datasource: 'myMongo',
});
```

3\. На третьей строке выполняется регистрация служебных перехватчиков запроса
для работы пользовательской сессии и декораторов контроля доступа к маршрутам.

```ts
// регистрация перехватчиков запроса
authService.registerRequestHooks();
```

### Регистрация пользователя

Библиотека предоставляет готовый механизм для создания новых пользователей,
который включает валидацию данных, проверку на уникальность и хеширование
пароля. Основная логика регистрации реализуется вызовом метода `createUser`
сервиса `AuthService`. Ниже приведен пример для регистрации в контроллере.

```ts
import {Service} from '@e22m4u/js-service';
import {WithoutId} from '@e22m4u/ts-repository';
import {postAction} from '@e22m4u/ts-rest-router';
import {restController} from '@e22m4u/ts-rest-router';
import {requestBodyWithModel} from '@e22m4u/ts-rest-router-repository';

import {AuthService, UserModel} from '@e22m4u/ts-rest-router-auth';

@restController('users')
class UserController extends Service {
  /**
   * Создание нового пользователя.
   * 
   * POST /users/register
   */
  @postAction('register')
  register(
    @requestBodyWithModel(UserModel, {required: true})
    body: WithoutId<UserModel>,
  ) {
    // получение request-scoped экземпляра AuthService
    const authService = this.getRegisteredService(AuthService);
    // проверка наличия хотя бы одного идентификатора для входа
    authService.requireAnyLoginId(body);
    // вызов метода создания пользователя
    return authService.createUser(body);
  }
}
```

### Аутентификация (вход в систему)

Процесс аутентификации заключается в проверке учетных данных пользователя и,
в случае успеха, в создании сессии с выпуском JWT (JSON Web Token). Эта логика инкапсулирована в сервисе `AuthService` и включает в себя поиск пользователя,
проверку пароля и генерацию токена. Ниже приведен пример реализации маршрута
для входа в систему.

```ts
import {Service} from '@e22m4u/js-service';

import {
  postAction,
  requestBody,
  restController,
} from '@e22m4u/ts-rest-router';

import {
  AuthService,
  UserLookupWithPassword,
  USER_LOOKUP_WITH_PASSWORD_SCHEMA,
} from '@e22m4u/ts-rest-router-auth';

@restController('users')
class UserController extends Service {
  /**
   * Аутентификация пользователя и выпуск JWT.
   *
   * POST /users/login
   */
  @postAction('login')
  async login(
    @requestBody(USER_LOOKUP_WITH_PASSWORD_SCHEMA)
    body: UserLookupWithPassword,
  ) {
    // получение request-scoped экземпляра AuthService
    const authService = this.getRegisteredService(AuthService);
    // поиск пользователя по одному из идентификаторов
    const user = await authService.findUserByLoginIds(body);
    // проверка пароля
    if (user.password) {
      await authService.verifyPassword(body.password || '', user.password);
    }
    // создание токена доступа (в базе данных)
    const accessToken = await authService.createAccessToken(user.id);
    // генерация JWT
    const { token, expiresAt } = await authService.issueJwt(accessToken);
    // возврат токена и данных пользователя
    return {token, expiresAt, user};
  }
}
```

### Получение данных текущего пользователя

Для получения информации об аутентифицированном пользователе используется
сервис `AuthSession`. Этот сервис автоматически создается для каждого запроса
и содержит данные пользователя, если в запросе был предоставлен валидный JWT.
Метод `session.getUser()` возвращает объект пользователя или выбрасывает ошибку
`401 Unauthorized`, если сессия анонимна.

```ts
import {Service} from '@e22m4u/js-service';
import {getAction, restController} from '@e22m4u/ts-rest-router';
import {AuthSession, requireRole} from '@e22m4u/ts-rest-router-auth';

@restController('users')
class UserController extends Service {
  /**
   * Получение данных текущего пользователя.
   *
   * GET /users/whoAmI
   */
  @getAction('whoAmI')
  whoAmI() {
    // получение request-scoped экземпляра AuthSession
    const session = this.getRegisteredService(AuthSession);
    // возврат данных пользователя из сессии
    return session.getUser();
  }
}
```

### Обновление профиля

Обновление данных пользователя выполняется методом `authService.updateUser`.
В качестве первого аргумента данный метод принимает ID пользователя, который
необходимо обновить, а вторым - объект с новыми данными. ID текущего
пользователя извлекается из сессии с помощью `session.getUserId()`,
что гарантирует правильного владельца.

```ts
import {Service} from '@e22m4u/js-service';
import {WithoutId} from '@e22m4u/ts-repository';
import {patchAction} from '@e22m4u/ts-rest-router';
import {restController} from '@e22m4u/ts-rest-router';
import {requestBodyWithModel} from '@e22m4u/ts-rest-router-repository';

import {
  AccessRule,
  AuthService,
  AuthSession,
  UserModel,
  requireRole,
} from '@e22m4u/ts-rest-router-auth';

@restController('users')
class UserController extends Service {
  /**
   * Обновление профиля текущего пользователя.
   *
   * PATCH /users/profile
   */
  @patchAction('profile')
  @requireRole(AccessRule.AUTHENTICATED) // доступ только для аутентифицированных
  patchProfile(
    @requestBodyWithModel(UserModel)
    body: Partial<WithoutId<UserModel>>,
  ) {
    const session = this.getRegisteredService(AuthSession);
    const authService = this.getRegisteredService(AuthService);
    // проверка наличия хотя бы одного идентификатора (в режиме partial)
    authService.requireAnyLoginId(body, true);
    // вызов метода обновления пользователя
    return authService.updateUser(session.getUserId(), body);
  }
}
```

### Выход из системы (завершение сессии)

Процесс выхода из системы заключается в удалении текущего токена доступа
из базы данных. Метод `authService.removeAccessTokenById` принимает ID токена
(не сам JWT), который можно получить из сессии через `session.getAccessTokenId()`.
После удаления токена из базы все последующие запросы с этим JWT будут
недействительны.

```ts
import {Service} from '@e22m4u/js-service';
import {getAction} from '@e22m4u/ts-rest-router';
import {restController} from '@e22m4u/ts-rest-router';

import {
  AccessRule,
  AuthService,
  AuthSession,
  requireRole,
} from '@e22m4u/ts-rest-router-auth';

@restController('users')
class UserController extends Service {
  /**
   * Выход из системы (инвалидация токена).
   *
   * GET /users/logout
   */
  @getAction('logout')
  @requireRole(AccessRule.AUTHENTICATED) // доступ только для аутентифицированных
  async logout() {
    const session = this.getRegisteredService(AuthSession);
    const authService = this.getRegisteredService(AuthService);
    // получение ID токена доступа из сессии
    const accessTokenId = session.getAccessTokenId();
    // удаление токена из базы данных
    const result = await authService.removeAccessTokenById(accessTokenId);
    return {success: result};
  }
}
```

## AuthService

`AuthService` является центральным компонентом модуля, предоставляющим всю
основную логику для управления пользователями, аутентификации, генерации
токенов и управления сессиями. Этот сервис регистрируется в корневом
IoC-контейнере приложения. Ниже приводится список методов его экземпляра.

### AuthService.registerModels

Регистрирует встроенные [модели](#модели) данных в `DatabaseSchema`
и привязывает их к указанному источнику данных. Этот метод необходимо
вызвать один раз при инициализации приложения.

**Сигнатура**

```ts
registerModels(options?: {datasource?: string}): void
```

**Параметры**

- `options.datasource`  
  Строка, содержащая имя источника данных, в котором будут созданы и сохранены коллекции/таблицы для моделей.

**Пример**

```ts
// определение источника данных
dbs.defineDatasource({
  name: 'myDb',
  adapter: 'memory',
});

// регистрация моделей в этом источнике данных
authService.registerModels({datasource: 'myDb'});
```

### AuthService.registerRequestHooks

Регистрирует глобальный перехватчик запроса `preHandler` в `RestRouter`. Этот
перехватчик выполняется перед каждым запросом и отвечает за создание и внедрение
сессии `AuthSession` и *request-scoped* экземпляра `AuthService` в DI-контейнер
запроса. Вызов этого метода является обязательным для корректной работы сессий
и декораторов защиты маршрутов.

**Сигнатура**

```ts
registerRequestHooks(): void
```

**Пример**

```ts
// этот вызов активирует систему сессий для всех маршрутов
authService.registerRequestHooks();
```

### AuthService.createUser

Создает нового пользователя, выполняя все необходимые проверки и преобразования
данных.

**Сигнатура**

```ts
createUser<T extends BaseUserModel, V extends WithoutId<T>>(
  inputData: V
): Promise<T>
```
**Процесс выполнения**

- **Валидация формата**  
  Проверяет формат `username`, `email`, `phone` и `password` с помощью
  соответствующих валидаторов.
- **Проверка уникальности**  
  Убеждается, что предоставленные `username`, `email` и `phone` не используются
  другими пользователями.
- **Хеширование пароля**  
  Безопасно хэширует пароль с использованием `bcrypt`.
- **Сохранение**  
  Создает новую запись пользователя в базе данных.

Метод возвращает `Promise`, который разрешается объектом созданного
пользователя.

**Пример**

```ts
const newUser = await authService.createUser({
  username: 'testUser',
  email: 'test@example.com',
  password: 'Password123',
});
```

### AuthService.findUserByLoginIds

Осуществляет поиск пользователя по одному из его идентификаторов: `username`,
`email` или `phone`. Поиск по `username` и `email` по умолчанию
регистронезависимый.

**Сигнатура**

```ts
findUserByLoginIds<T extends BaseUserModel>(
  lookup: LoginIdsFilter,
  include?: IncludeClause,
  silent?: boolean
): Promise<T | undefined>
```

**Параметры**

- `lookup`  
  *объект полем `username`, `email` или `phone`;*

- `silent` (опционально, по умолчанию `false`)  
  *если `true` и пользователь не найден, метод вернет `undefined`;*  
  *если `false`, будет выброшена ошибка `400 Bad Request`;*

**Пример**

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

### AuthService.verifyPassword

Сравнивает предоставленный пароль с хэшем, хранящимся в базе данных.

**Сигнатура**
```ts
verifyPassword(
  password: string,
  hash: string,
  silent?: boolean,
): Promise<boolean | true>
```

**Параметры**

- `password`  
  *пароль в открытом виде, введенный пользователем;*

- `hash`  
  *хэш пароля из объекта пользователя;*

- `silent` (опционально, по умолчанию `false`)  
  *если `true` и пароли не совпадают, метод вернет `false`;*  
  *если `false`, будет выброшена ошибка `400 Bad Request`;*

**Пример**

```ts
// выбросит ошибку, если пароль неверный
await authService.verifyPassword('Password123', user.password);
```

### AuthService.createAccessToken

Создает запись о токене доступа в базе данных. Это необходимо для управления
сессиями и реализации механизма выхода из системы. ID созданной записи
используется как `tid` (Token ID) в полезной нагрузке JWT.

**Сигнатура**

```ts
createAccessToken<T extends BaseAccessTokenModel>(
  ownerId: string | number
): Promise<T>
```

**Параметры**

- `ownerId`  
  *ID пользователя, для которого создается токен;*

**Пример**

```ts
const accessToken = await authService.createAccessToken(user.id);
```

### AuthService.issueJwt

Генерирует JWT на основе ранее созданного `AccessToken`.

**Сигнатура**

```ts
issueJwt(
  accessToken: BaseAccessTokenModel,
): Promise<{token: string, expiresAt: string}>
```

**Параметры**

- `accessToken`  
  *объект токена доступа, полученный из метода `createAccessToken`*

**Процесс выполнения**

1. Формирует полезную нагрузку с полями `uid` (User ID) и `tid` (Token ID).
2. Подписывает токен с помощью `jwtSecret`.
3. Устанавливает время жизни (`exp`) на основе опции `jwtTtl`.

**Пример**

```ts
const {token, expiresAt} = await authService.issueJwt(accessToken);
```

### AuthService.updateUser

Обновляет данные существующего пользователя. Метод выполняет те же валидации
формата и уникальности, что и `createUser`, для всех полей, которые переданы
в `inputData`.

**Сигнатура**

```ts
updateUser<T extends BaseUserModel>(
  userId: T['id'],
  inputData: Partial<T>
): Promise<T>
```

**Параметры**

- `userId`  
  *ID пользователя, которого нужно обновить;*
  *`inputData`: Объект с полями для обновления;*

**Пример**

```ts
const updatedUser = await authService.updateUser(
  session.getUserId(),
  {email: 'new.email@example.com'},
);
```

### AuthService.removeAccessTokenById

Удаление записи `AccessToken` из базы данных. Это основной механизм
для реализации выхода из системы.

**Сигнатура**

```ts
removeAccessTokenById(accessTokenId: string): Promise<boolean>
```

**Параметры**

- `accessTokenId`  
  *ID токена доступа, который необходимо удалить,*  
  *этот ID можно получить из сессии (`session.getAccessTokenId()`);*

**Пример**

```ts
const accessTokenId = session.getAccessTokenId();
const result = await authService.removeAccessTokenById(accessTokenId);
// result === true, если токен был успешно удален
```

### AuthService.requireAnyLoginId

Вспомогательный метод валидации, который проверяет наличие в переданном
объекте хотя бы одного из полей для входа (`username`, `email` или `phone`).
Если ни одно из полей не найдено или их значения пустые, выбрасывается ошибка.

**Сигнатура**

```ts
requireAnyLoginId(data: object, partial = false): void
```

**Параметры**

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
