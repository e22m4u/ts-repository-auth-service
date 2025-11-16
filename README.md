## @e22m4u/ts-repository-auth-service

Сервис авторизации с ролевой моделью для
[@e22m4u/ts-repository](https://www.npmjs.com/package/@e22m4u/ts-repository).

## Содержание

- [Установка](#установка)
- [Использование](#использование)
  - [Предварительная настройка](#предварительная-настройка)
    - [1. Инициализация сервисов](#1-инициализация-сервисов)
    - [2. Настройка моделей](#2-настройка-моделей)
    - [3. Создание сессии для запроса](#3-создание-сессии-для-запроса)
    - [4. Определение контроллера](#4-определение-контроллера)
    - [5. Запуск HTTP сервера](#5-запуск-http-сервера)
  - [Реализация методов](#реализация-методов)
    - [Создание пользователя](#создание-пользователя)
    - [Аутентификация](#аутентификация)
    - [Получение данных пользователя](#получение-данных-пользователя)
    - [Обновление профиля](#обновление-профиля)
    - [Выход из системы](#выход-из-системы)
- [Конфигурация AuthService](#конфигурация-authservice)
  - [passwordHashRounds](#passwordhashrounds)
  - [jwtSecret](#jwtsecret)
  - [jwtTtl](#jwtttl)
  - [jwtHeaderName](#jwtheadername)
  - [jwtCookieName](#jwtcookiename)
  - [jwtQueryParam](#jwtqueryparam)
  - [sessionUserInclusion](#sessionuserinclusion)
- [Интерфейс AuthService](#интерфейс-authservice)
  - [createUser](#authservicecreateuser)
  - [updateUser](#authserviceupdateuser)
  - [findUserBeforeLogin](#authservicefinduserbeforelogin)
  - [ensureUserDoesNotExist](#authserviceensureuserdoesnotexist)
  - [verifyPassword](#authserviceverifypassword)
  - [hashPassword](#authservicehashpassword)
  - [createAccessToken](#authservicecreateaccesstoken)
  - [issueJwt](#authserviceissuejwt)
  - [decodeJwt](#authservicedecodejwt)
  - [removeAccessTokenById](#authserviceremoveaccesstokenbyid)
  - [createAuthSession](#authservicecreateauthsession)
  - [findAccessTokenByHttpRequest](#authservicefindaccesstokenbyhttprequest)
  - [findAccessTokenOwner](#authservicefindaccesstokenowner)
- [UserDataService](#userdataservice)
- [AccessGuard](#accessguard)
  - [accessGuard.requireRole](#accessguardrequirerole)
- [Модели](#модели)
  - [BaseRoleModel и RoleModel](#baserolemodel-и-rolemodel)
  - [BaseUserModel и UserModel](#baseusermodel-и-usermodel)
  - [BaseAccessTokenModel и AccessTokenModel](#baseaccesstokenmodel-и-accesstokenmodel)
- [Тесты](#тесты)
- [Лицензия](#лицензия)

## Установка

```bash
npm install @e22m4u/ts-repository-auth-service
```

Модуль поддерживает ESM и CommonJS стандарты.

*ESM*

```ts
import {AuthService} from '@e22m4u/ts-repository-auth-service';
```

*CommonJS*

```ts
const {AuthService} = require('@e22m4u/ts-repository-auth-service');
```

## Использование

В данном разделе пошагово демонстрируется создание базового, но
функционального приложения с аутентификацией. В примерах используется
маршрутизатор
[@e22m4u/ts-rest-router](https://www.npmjs.com/package/@e22m4u/ts-rest-router).

### Предварительная настройка

Каждый следующий фрагмент кода является логическим продолжением
предыдущего.

#### 1. Инициализация сервисов

В основе приложения лежат три ключевых компонента: сервис-контейнер для
управления зависимостями, маршрутизатор для обработки HTTP запросов и
схема баз данных для работы с моделями. Первым шагом является их
инициализация.

```ts
import http from 'http';
import {RestRouter} from '@e22m4u/ts-rest-router';
import {ServiceContainer} from '@e22m4u/js-service';
import {DatabaseSchema} from '@e22m4u/ts-repository';

const app = new ServiceContainer();
const router = app.get(RestRouter);
const dbs = app.get(DatabaseSchema);
```

#### 2. Настройка моделей

Базовые модели библиотеки предоставляют минимально необходимый набор полей.
Их следует расширить для соответствия требованиям проекта. В данном
примере `BaseUserModel` расширяется полем `username`.

```ts
import {
  model,
  property,
  DataType,
  PropertyUniqueness,
} from '@e22m4u/ts-repository';

import {
  BaseRoleModel,
  BaseUserModel,
  BaseAccessTokenModel,
} from '@e22m4u/ts-repository-auth-service';

// определение in-memory источника данных "main"
// (см. раздел «Источник данных» модуля @e22m4u/ts-repository)
dbs.defineDatasource({
  name: 'main',
  adapter: 'memory',
});

// определение модели роли, наследуемой от BaseRoleModel
// и связанной с источником данных "main" (определен выше)
@model({datasource: 'main'})
class RoleModel extends BaseRoleModel {}

// определение модели пользователя, также связанной
// с источником 'main' и расширенной от базовой модели
@model({datasource: 'main'})
class UserModel extends BaseUserModel {
  // стандартная модель BaseUserModel намеренно не содержит полей
  // с идентификаторами входа (вроде имени пользователя или email),
  // чтобы быть универсальной, и вручную добавляя поле `username`,
  // мы определяем, что в данном приложении пользователи будут
  // идентифицироваться именно по этому уникальному имени
  @property({
    type: DataType.STRING,
    required: true,
    unique: PropertyUniqueness.STRICT,
  })
  username!: string;
}

// определение модели токенов доступа,
// аналогично моделям выше
@model({datasource: 'main'})
class AccessTokenModel extends BaseAccessTokenModel {}

// регистрация моделей в схеме баз данных,
// что позволит работать с их репозиториями
dbs.defineModelByClass(RoleModel);
dbs.defineModelByClass(UserModel);
dbs.defineModelByClass(AccessTokenModel);
```

#### 3. Создание сессии для запроса

Для определения статуса аутентификации пользователя каждый входящий запрос
должен проверяться на наличие *JWT (JSON Web Token)*. Эта задача решается
добавлением глобального *pre-handler* хука. Данный хук создает
экземпляр `AuthSession` и помещает его в контейнер, доступный
в области запроса.

```ts
import {AuthService, AuthSession} from '@e22m4u/ts-repository-auth-service';

router.addPreHandler(async ctx => {
  // для каждого запроса извлекается request-scoped экземпляр AuthService
  // (экземпляр создается автоматически в методе `container.get`)
  const authService = ctx.container.get(AuthService);
  // на основе токена из контекста запроса (если он есть) создается сессия
  const authSession = await authService.createAuthSession(ctx.request);
  // созданная сессия сохраняется в контейнере запроса для доступа
  // в методах контроллера (обработчиках маршрута)
  ctx.container.set(AuthSession, authSession);
});
```

#### 4. Определение контроллера

Бизнес логика приложения реализуется в контроллерах. Следующим шагом
будет создание класса `UserController` для обработки всех запросов,
связанных с пользователями. Затем этот контроллер регистрируется в
маршрутизаторе.

```ts
import {Service} from '@e22m4u/js-service';
import {restController} from '@e22m4u/ts-rest-router';

@restController('users')
class UserController extends Service {
  // методы контроллера будут добавлены в следующих разделах,
  // см. далее
}

// регистрация контроллера
router.addController(UserController);
```

#### 5. Запуск HTTP сервера

Финальным шагом является создание и запуск HTTP сервера Node.js.
Маршрутизатор, настроенный ранее, передается ему в качестве обработчика
запросов.

```ts
const server = new http.Server();
server.on('request', router.requestListener);

const port = 3000;
const host = '0.0.0.0';
server.listen(port, host, function () {
  console.log('Server listening on', `http://${host}:${port}`);
});
```

### Реализация методов

В следующих подразделах формируются методы контроллера `UserController`
для выполнения ключевых операций.

#### Создание пользователя

Создание пользователя требует предварительной валидации данных и проверки
их уникальности. За валидацию отвечает сервис `UserDataService`, а за проверку
уникальности и непосредственно создание пользователя `AuthService`.

```ts
import {WithoutId} from '@e22m4u/ts-repository';

import {
  postAction,
  restController,
} from '@e22m4u/ts-rest-router';

import {
  requestBodyWithModel,
  responseBodyWithModel,
} from '@e22m4u/ts-rest-router-repository';

import {
  UserModel,
  AuthService,
  UserDataService,
} from '@e22m4u/ts-repository-auth-service';

/**
 * User controller.
 */
@restController('users')
class UserController extends Service {
  /**
   * Create.
   * 
   * POST /users
   */
  @postAction()
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
}
```

#### Аутентификация

Процесс аутентификации включает в себя поиск пользователя, проверку
пароля и генерацию JWT. Эта логика инкапсулирована в `AuthService`.

```ts
import {
  postAction,
  responseBody,
  requestField,
  restController,
} from '@e22m4u/ts-rest-router';

import {
  UserModel,
  AuthService,
  JWT_ISSUE_RESULT_SCHEMA,
} from '@e22m4u/ts-repository-auth-service';

/**
 * User controller.
 */
@restController('users')
class UserController extends Service {
  // ... метод create

  /**
   * Login.
   * 
   * POST /users/login
   */
  @postAction('login')
  @responseBody(JWT_ISSUE_RESULT_SCHEMA)
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
}
```

#### Получение текущего пользователя

Для получения информации о пользователе текущей сессии используется
сервис `AuthSession`. Метод `session.getUser()` возвращает объект
пользователя или выбрасывает ошибку `401 Unauthorized`, если сессия
анонимна.

```ts
import {getAction, restController} from '@e22m4u/ts-rest-router';
import {responseBodyWithModel} from '@e22m4u/ts-rest-router-repository';
import {UserModel, AuthSession} from '@e22m4u/ts-repository-auth-service';

/**
 * User controller.
 */
@restController('users')
class UserController extends Service {
  // ... методы create, login

  /**
   * Get me.
   * 
   * GET /users/me
   */
  @getAction('me')
  @responseBodyWithModel(UserModel)
  getMe() {
    const session = this.getRegisteredService(AuthSession);
    return session.getUser();
  }
}
```

#### Обновление текущего пользователя

Обновление данных пользователя выполняется методом `updateUser`.
Идентификатор текущего пользователя извлекается из сессии с помощью
`session.getUserId()`, что гарантирует изменение данных правильного
владельца.

```ts
import {WithoutId} from '@e22m4u/ts-repository';
import {patchAction, restController} from '@e22m4u/ts-rest-router';

import {
  requestBodyWithModel,
  responseBodyWithModel,
} from '@e22m4u/ts-rest-router-repository';

import {
  UserModel,
  AuthService,
  AuthSession,
  UserDataService,
} from '@e22m4u/ts-repository-auth-service';

/**
 * User controller.
 */
@restController('users')
class UserController extends Service {
  // ... методы create, login, getMe

  /**
   * Patch me.
   * 
   * PATCH /users/me
   */
  @patchAction('me')
  @responseBodyWithModel(UserModel)
  async patchMe(
    @requestBodyWithModel(UserModel, {partial: true, required: true})
    body: Partial<WithoutId<UserModel>>,
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
}
```

#### Выход из системы

Процесс выхода заключается в удалении текущего токена доступа из базы
данных. Метод `removeAccessTokenById` принимает идентификатор токена,
который можно получить из сессии через `session.getAccessTokenId()`.

```ts
import {
  getAction,
  responseBody,
  restController,
} from '@e22m4u/ts-rest-router';

import {
  AuthService,
  AuthSession,
  LOGOUT_RESULT_SCHEMA,
} from '@e22m4u/ts-repository-auth-service';

/**
 * User controller.
 */
@restController('users')
class UserController extends Service {
  // ... методы create, login, getMe, patchMe

  /**
   * Logout.
   * 
   * GET /users/logout
   */
  @getAction('logout')
  @responseBody(LOGOUT_RESULT_SCHEMA)
  async logout() {
    const session = this.getRegisteredService(AuthSession);
    const accessTokenId = session.getAccessTokenId();
    const authService = this.getRegisteredService(AuthService);
    const result = await authService.removeAccessTokenById(accessTokenId);
    return {success: result};
  }
}
```

## Конфигурация AuthService

Поведение `AuthService` можно настроить через объект опций, который
передается в конструктор сервиса или регистрируется в контейнере.

**Способ 1. Регистрация в контейнере**

```ts
import {ServiceContainer} from '@e22m4u/js-service';
import {AuthServiceOptions} from '@e22m4u/ts-repository-auth-service';

const app = new ServiceContainer();
// const router = app.get(...
// const dbs = app.get(...

app.use(AuthServiceOptions, {
  jwtSecret: '5VGo3m04sGiL',
  jwtTtl: 14 * 86400, // 14 дней
  passwordHashRounds: 12,
});
```

**Способ 2. Передача в конструктор**

```ts
router.addPreHandler(ctx => {
  // второй аргумент метода `container.get` будет
  // передан в конструктор AuthService
  const authService = ctx.container.get(AuthService, {
    jwtSecret: '5VGo3m04sGiL',
    jwtTtl: 14 * 86400, // 14 дней
    jwtCookieName: 'accessToken',
    passwordHashRounds: 12,
  });
  // const authSession = ...
});
```

### AuthServiceOptions

Ниже приводится набор доступных опций сервиса авторизации.

#### passwordHashRounds

Количество раундов хеширования пароля модулем `bcrypt`.

- Тип: `number`
- По умолчанию: `12`

#### jwtSecret

Секретный ключ для подписи JWT.

- Тип: `string`
- По умолчанию: `'REPLACE_ME!'`

#### jwtTtl

Время жизни JWT в секундах.

- Тип: `number`
- По умолчанию: `1209600` (14 дней)

#### jwtHeaderName

Имя HTTP заголовка для поиска JWT.

- Тип: `string`
- По умолчанию: `'authorization'`

#### jwtCookieName

Имя cookie для поиска JWT.

- Тип: `string`
- По умолчанию: `'accessToken'`

#### jwtQueryParam

Имя query параметра URL для поиска JWT.

- Тип: `string`
- По умолчанию: `'accessToken'`

#### sessionUserInclusion

Связанные данные пользователя для загрузки в сессию.

- Тип: `IncludeClause`
- По умолчанию: `'roles'`

## Интерфейс AuthService

`AuthService` является центральным компонентом модуля.


#### authService.createUser

Создает нового пользователя. Пароль автоматически хешируется.

```ts
createUser<T extends BaseUserModel>(
  inputData: WithOptionalId<T>,
  filter?: ItemFilterClause<T>,
): Promise<T>;
```

#### authService.updateUser

Обновляет данные существующего пользователя. Если передан пароль, он
будет хеширован.

```ts
updateUser<T extends BaseUserModel>(
  userId: T['id'],
  inputData: Partial<T>,
  filter?: ItemFilterClause<T>,
): Promise<T>;
```

#### authService.findUserBeforeLogin

Осуществляет поиск пользователя по указанным критериям.

```ts
findUserBeforeLogin<T extends BaseUserModel>(
  where: WhereClause<T>,
): Promise<T>;
```

#### authService.ensureUserDoesNotExist

Проверяет, что пользователь с указанными данными не существует. Если
пользователь найден, выбрасывается ошибка `409 Conflict`.

```ts
ensureUserDoesNotExist<T extends BaseUserModel>(
  where: WhereClause<T>,
  excludeUserId?: T['id'],
): Promise<void>;
```

#### authService.verifyPassword

Сравнивает предоставленный пароль с хешем.

```ts
verifyPassword(
  password: string | undefined,
  hash: string | undefined,
): Promise<true>;

verifyPassword(
  password: string | undefined,
  hash: string | undefined,
  silent: true,
): Promise<boolean>;
```

#### authService.hashPassword

Хеширует пароль с использованием `bcrypt`.

```ts
hashPassword(password: string): Promise<string>;
```

#### authService.createAccessToken

Создает запись о токене доступа в базе данных.

```ts
createAccessToken<T extends BaseAccessTokenModel>(
  ownerId: string | number,
  patch?: Partial<T>,
): Promise<T>;
```

#### authService.issueJwt

Генерирует JWT на основе `AccessToken`.

```ts
issueJwt(
  accessToken: BaseAccessTokenModel,
): Promise<{token: string, expiresAt: string}>;
```

#### authService.decodeJwt

Проверяет и декодирует JWT, извлекая из него полезную нагрузку.

```ts
decodeJwt(jwToken: string): Promise<JwtPayload>;
```

#### authService.removeAccessTokenById

Удаляет запись `AccessToken` из базы данных по идентификатору.

```ts
removeAccessTokenById(
  accessTokenId: AccessTokenModel['id'],
): Promise<boolean>;
```

#### authService.createAuthSession

Создает экземпляр `AuthSession` на основе HTTP запроса.

```ts
createAuthSession(req: IncomingMessage): Promise<AuthSession>;
```

#### authService.findAccessTokenByHttpRequest

Извлекает JWT из HTTP запроса и находит `AccessToken` в базе данных.

```ts
findAccessTokenByHttpRequest<T extends BaseAccessTokenModel>(
  req: IncomingMessage,
  include?: IncludeClause<T>,
): Promise<T | undefined>;
```

#### authService.findAccessTokenOwner

Находит пользователя, который является владельцем `AccessToken`.

```ts
findAccessTokenOwner<T extends BaseUserModel>(
  accessToken: BaseAccessTokenModel,
  include?: IncludeClause<T>,
): Promise<T>;
```

## UserDataService

Сервис `UserDataService` предоставляет методы для валидации пользовательских
данных, таких как имя пользователя, email, телефон и пароль.

```ts
const userDataService = container.get(UserDataService);

// проверка имени пользователя
userDataService.validateUsername('myUserName');

// проверка email
userDataService.validateEmail('test@example.com');

// проверка телефона
userDataService.validatePhone('+12025550104', 'US');

// проверка пароля
userDataService.validatePassword('myPassword123');
```

## AccessGuard

Сервис `AccessGuard` предназначен для реализации ролевой модели доступа
(RBAC) и защиты маршрутов.

```ts
router.defineRoute({
  // ...
  async handler({container}) {
    const accessGuard = container.get(AccessGuard);
    accessGuard.requireRole('admin');
    // ... логика, доступная только администраторам
  },
});
```

#### accessGuard.requireRole

Проверяет, аутентифицирован ли пользователь и имеет ли он необходимые
роли.

```ts
requireRole(roleName?: string | string[]): void;
```

- Без аргументов требуется только факт аутентификации.
- Если передана строка, то требуется наличие конкретной роли.
- Если массив строк, то требуется наличие хотя бы одной роли из списка.

## Модели

Ниже приводятся определения базовых моделей.

#### BaseRoleModel и RoleModel

```ts
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

@model()
export class RoleModel<
  IdType = number | string,
> extends BaseRoleModel<IdType> {}

```

#### BaseUserModel и UserModel

```ts
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

@model()
export class UserModel<
  IdType = number | string,
  RoleType extends BaseRoleModel = BaseRoleModel,
> extends BaseUserModel<IdType, RoleType> {}

```

#### BaseAccessTokenModel и AccessTokenModel

```ts
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

@model()
export class AccessTokenModel<
  IdType = number | string,
  UserType extends BaseUserModel = BaseUserModel,
> extends BaseAccessTokenModel<IdType, UserType> {}

```

## Тесты

```bash
npm test
```

## Лицензия

MIT