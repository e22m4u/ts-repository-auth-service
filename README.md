## @e22m4u/ts-rest-router-auth

Подключаемый сервис авторизации с ролевой моделью.

Модуль встраивается в связку:

- [@e22m4u/js-service](https://www.npmjs.com/package/@e22m4u/js-service)
  \- сервис-контейнер (IoC);
- [@e22m4u/ts-rest-router](https://www.npmjs.com/package/@e22m4u/ts-rest-router)
  \- REST-маршрутизатор на основе префиксного дерева;
- [@e22m4u/ts-repository](https://www.npmjs.com/package/@e22m4u/ts-repository)
  \- ORM/ODM для работы с базами данных;

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

### Интеграция AuthService

Для интеграции сервиса `AuthService` выполняется инъекция класса сервиса
в сервис-контейнер приложения и вызов некоторых методов предварительной
настройки. Так как после инъекции сразу потребуется экземпляр сервиса,
инъекция выполняется методом `app.get()`.

```ts
const authService = app.get(AuthService); // см. 1
authService.registerModels({datasource: 'myMongo'}); // см. 2
authService.registerRequestHooks(); // регистрация перехватчиков запроса
```

1\. На первой строке примера выше выполняется инъекция сервиса авторизации
без дополнительных аргументов. Но вторым параметром метода `app.get()`
можно передать объект с настройками, как это показано ниже.

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

2\. На второй строке выполняется регистрация [моделей](#Модели)
с параметром `datasource`. В данном параметре требуется указать название
предварительно зарегистрированного
[источника данных](https://www.npmjs.com/package/@e22m4u/js-repository#источник-данных),
где будут храниться роли, пользователи и другие сущности. Ниже приводится
пример регистрации источника данных.

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

WIP

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
