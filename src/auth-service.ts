import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v7 as uuidV7} from 'uuid';
import HttpErrors from 'http-errors';
import {IncomingMessage} from 'http';
import {AuthSession} from './auth-session.js';
import {Localizer} from '@e22m4u/js-localizer';
import {AuthLocalizer} from './auth-localizer.js';
import {ServiceContainer} from '@e22m4u/js-service';
import {DebuggableService} from './debuggable-service.js';

import {
  WhereClause,
  IncludeClause,
  WithOptionalId,
  DatabaseSchema,
  ItemFilterClause,
} from '@e22m4u/js-repository';

import {
  createError,
  parseUrlQuery,
  removeEmptyKeys,
  parseCookieHeader,
} from './utils/index.js';

import {
  AccessTokenModel,
  BaseAccessTokenModel,
  BaseUserModel,
  UserModel,
} from './models/index.js';

import {
  emailFormatValidator,
  passwordFormatValidator,
  phoneFormatValidator,
  usernameFormatValidator,
} from './validators/index.js';

const {JsonWebTokenError, TokenExpiredError} = jwt;

/**
 * Login id names.
 */
export const LOGIN_ID_NAMES = ['username', 'email', 'phone'] as const;

/**
 * Login id.
 */
export type LoginIdName = (typeof LOGIN_ID_NAMES)[number];

/**
 * Case insensitive login ids.
 */
export const CASE_INSENSITIVE_LOGIN_IDS: LoginIdName[] = [
  'username',
  'email',
  'phone',
];

/**
 * Data format validator.
 */
export type DataFormatValidator = (
  value: unknown,
  localizer: Localizer,
) => void;

/**
 * Auth service options.
 */
export class AuthServiceOptions {
  passwordHashRounds: number = 12;
  usernameFormatValidator: DataFormatValidator = usernameFormatValidator;
  emailFormatValidator: DataFormatValidator = emailFormatValidator;
  phoneFormatValidator: DataFormatValidator = phoneFormatValidator;
  passwordFormatValidator: DataFormatValidator = passwordFormatValidator;
  jwtSecret: string = 'REPLACE_ME!';
  jwtTtl: number = 14 * 86400; // 14 days
  jwtHeaderName: string = 'authorization';
  jwtCookieName: string = 'accessToken';
  jwtQueryParam: string = 'accessToken';
  sessionUserInclusion: IncludeClause = 'roles';

  /**
   * Constructor.
   *
   * @param options
   */
  constructor(options?: Partial<AuthServiceOptions>) {
    if (options) {
      const filteredOptions = removeEmptyKeys(options);
      Object.assign(this, filteredOptions);
    }
  }
}

/**
 * Login ids filter.
 */
export type LoginIdsFilter = {
  username?: string;
  email?: string;
  phone?: string;
};

/**
 * User lookup with password.
 */
export type UserLookupWithPassword = LoginIdsFilter & {
  password?: string;
};

/**
 * Jwt payload.
 */
export type JwtPayload = {
  tid: string;
  uid: string;
};

/**
 * Jwt issue result.
 */
export type JwtIssueResult = {
  token: string;
  expiresAt: string;
};

/**
 * Auth service.
 */
export class AuthService extends DebuggableService {
  /**
   * Options.
   */
  readonly options: AuthServiceOptions;

  /**
   * Constructor.
   *
   * @param container
   * @param options
   */
  constructor(
    container?: ServiceContainer,
    options?: Partial<AuthServiceOptions>,
  ) {
    super(container);
    this.options = this.getService(AuthServiceOptions);
    if (options) {
      const filteredOptions = removeEmptyKeys(options);
      Object.assign(this.options, filteredOptions);
    }
    if (
      process.env.NODE_ENV === 'production' &&
      this.options.jwtSecret === 'REPLACE_ME!'
    ) {
      throw new Error('JWT secret is not set for the production environment!');
    }
  }

  /**
   * Create access token.
   *
   * @param user
   */
  async createAccessToken<T extends BaseAccessTokenModel>(
    ownerId: string | number,
    patch?: Partial<T>,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.createAccessToken);
    debug('Creating access token.');
    debug('Owner id was %v.', ownerId);
    const data: BaseAccessTokenModel = {
      id: uuidV7(),
      ownerId,
      createdAt: new Date().toISOString(),
      ...patch,
    };
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<BaseAccessTokenModel>(AccessTokenModel.name);
    const res = (await rep.create(data)) as T;
    debug('Access token created and saved to database.');
    return res;
  }

  /**
   * Remove access token by id.
   *
   * @param tokenId
   */
  async removeAccessTokenById(
    accessTokenId: AccessTokenModel['id'],
  ): Promise<boolean> {
    const debug = this.getDebuggerFor(this.removeAccessTokenById);
    debug('Removing access token by id.');
    debug('Token id was %v.', accessTokenId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<BaseAccessTokenModel>(AccessTokenModel.name);
    const res = await rep.deleteById(accessTokenId);
    if (res) {
      debug('Access token removed from database.');
    } else {
      debug('Access token not found.');
    }
    return res;
  }

  /**
   * Issue JSON Web Token.
   *
   * @param accessToken
   */
  issueJwt(accessToken: BaseAccessTokenModel): Promise<JwtIssueResult> {
    const debug = this.getDebuggerFor(this.issueJwt);
    debug('Issuing JWT.');
    debug('Token id was %v.', accessToken.id);
    debug('Owner id was %v.', accessToken.ownerId);
    const payload = {uid: accessToken.ownerId, tid: accessToken.id};
    const expiresAtInSec = Math.floor(Date.now() / 1000) + this.options.jwtTtl;
    const expiresAt = new Date(expiresAtInSec * 1000).toISOString();
    debug('Expiration date was %v.', expiresAt);
    return new Promise((res, rej) => {
      jwt.sign(
        payload,
        this.options.jwtSecret,
        {algorithm: 'HS256', expiresIn: this.options.jwtTtl},
        (err: unknown, token: string | undefined) => {
          if (err || !token) {
            console.error(err);
            return rej(
              createError(
                HttpErrors.InternalServerError,
                'TOKEN_ENCODING_FAILED',
                'Unable to encode JSON web token',
                payload,
              ),
            );
          }
          debug('Token was %v.', token);
          debug('Token created.');
          res({token, expiresAt});
        },
      );
    });
  }

  /**
   * Decode Jwt.
   *
   * @param jwToken
   */
  async decodeJwt(jwToken: string): Promise<JwtPayload> {
    const debug = this.getDebuggerFor(this.decodeJwt);
    debug('Decoding JWT.');
    let error: unknown;
    let payload: unknown;
    try {
      payload = await new Promise((res, rej) => {
        jwt.verify(
          jwToken,
          this.options.jwtSecret,
          (err: unknown, decoded: unknown) => {
            if (err) return rej(err);
            res(decoded);
          },
        );
      });
    } catch (err) {
      if (
        err instanceof TokenExpiredError ||
        err instanceof JsonWebTokenError
      ) {
        throw createError(
          HttpErrors.Unauthorized,
          'TOKEN_VERIFYING_FAILED',
          err.message, // Можно использовать сообщение из ошибки
          {token: jwToken},
        );
      }
      error = err;
    }
    if (
      error ||
      !payload ||
      typeof payload !== 'object' ||
      !('uid' in payload) ||
      !('tid' in payload) ||
      !payload.uid ||
      !payload.tid
    ) {
      console.error(error);
      throw createError(
        HttpErrors.InternalServerError,
        'TOKEN_VERIFYING_FAILED',
        'Unable to verify JSON web token',
        {token: jwToken, payload},
      );
    }
    debug.inspect('Payload:', payload);
    debug('Token decoded successfully.');
    return payload as JwtPayload;
  }

  /**
   * Find access token by id.
   *
   * @param jwToken
   * @param include
   */
  async findAccessTokenById<T extends BaseAccessTokenModel>(
    tokenId: string,
    include?: IncludeClause<T>,
  ): Promise<T | undefined> {
    const debug = this.getDebuggerFor(this.findAccessTokenById);
    debug('Finding access token by id.');
    debug('Token id was %v.', tokenId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<T>(AccessTokenModel.name);
    const accessToken = await rep.findOne({where: {id: tokenId}, include});
    if (!accessToken) {
      debug('Access token not found in database.');
      return;
    }
    debug('Access token found.');
    return accessToken as T;
  }

  /**
   * Hash password.
   *
   * @param password
   */
  async hashPassword(password: string): Promise<string> {
    if (!password) return '';
    try {
      return bcrypt.hash(password, this.options.passwordHashRounds);
    } catch (error) {
      console.error(error);
      throw createError(
        HttpErrors.InternalServerError,
        'PASSWORD_HASHING_ERROR',
        'Unable to hash the given password',
      );
    }
  }

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(password: string, hash: string): Promise<true>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(
    password: string,
    hash: string,
    silent: false,
  ): Promise<true>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(
    password: string,
    hash: string,
    silent: true,
  ): Promise<boolean>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(
    password: string,
    hash: string,
    silent?: boolean,
  ): Promise<boolean>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(
    password: string,
    hash: string,
    silent = false,
  ): Promise<boolean> {
    const debug = this.getDebuggerFor(this.verifyPassword);
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = 'authService.verifyPassword';
    debug('Verifying password');
    let isValid = false;
    try {
      isValid = await bcrypt.compare(password, hash);
    } catch (error) {
      console.error(error);
      throw createError(
        HttpErrors.InternalServerError,
        'PASSWORD_VERIFYING_ERROR',
        'Unable to verify the given password',
      );
    }
    if (!isValid) {
      if (silent) return false;
      throw createError(
        HttpErrors.BadRequest,
        'PASSWORD_VERIFYING_ERROR',
        localizer.t(`${errorKeyPrefix}.invalidPasswordError`),
      );
    }
    debug('Password verified.');
    return true;
  }

  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds<T extends BaseUserModel>(
    lookup: LoginIdsFilter,
    include?: IncludeClause<T>,
  ): Promise<T>;

  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds<T extends BaseUserModel>(
    lookup: LoginIdsFilter,
    include: IncludeClause<T> | undefined,
    silent: false,
  ): Promise<T>;

  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds<T extends BaseUserModel>(
    lookup: LoginIdsFilter,
    include: IncludeClause<T> | undefined,
    silent: true,
  ): Promise<T | undefined>;

  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds<T extends BaseUserModel>(
    lookup: LoginIdsFilter,
    include?: IncludeClause<T>,
    silent?: boolean,
  ): Promise<T | undefined>;

  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds<T extends BaseUserModel>(
    idsFilter: LoginIdsFilter,
    include?: IncludeClause<T>,
    silent = false,
  ): Promise<T | undefined> {
    const debug = this.getDebuggerFor(this.findUserByLoginIds);
    debug('Finding user by login identifiers.');
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = 'authService.findUserByLoginIds';
    // формирование условий выборки
    const where: WhereClause = {};
    let hasAnyLoginId = false;
    LOGIN_ID_NAMES.forEach(name => {
      if (idsFilter[name] && String(idsFilter[name]).trim()) {
        debug('Given %s was %v.', name, idsFilter[name]);
        hasAnyLoginId = true;
        const idValue = String(idsFilter[name]).trim();
        const idRegex = `^${idValue}$`;
        const isCaseInsensitive = CASE_INSENSITIVE_LOGIN_IDS.includes(name);
        where[name] = isCaseInsensitive
          ? {regexp: idRegex, flags: 'i'}
          : idValue;
      }
    });
    // если ни один идентификатор не определен,
    // то выбрасывается ошибка
    if (!hasAnyLoginId) {
      if (silent) return;
      this.requireAnyLoginId(idsFilter);
    }
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<T>(UserModel.name);
    const user = await userRep.findOne({where, include});
    if (!user) {
      debug('User not found.');
      if (silent) return;
      throw createError(
        HttpErrors.BadRequest,
        'USER_NOT_FOUND',
        localizer.t(`${errorKeyPrefix}.loginFailedError`),
      );
    }
    debug('User found with id %v.', user.id);
    return user as T;
  }

  /**
   * Validate login id.
   *
   * @param idName
   * @param idValue
   * @param ownerId
   */
  protected async validateLoginId(
    idName: LoginIdName,
    idValue: unknown,
    ownerId?: unknown,
  ): Promise<void> {
    const debug = this.getDebuggerFor(this.validateLoginId);
    debug('Validating login identifier in the user data input.');
    const localizer = this.getService(AuthLocalizer);
    const titledIdName = idName.charAt(0).toUpperCase() + idName.slice(1);
    const errorKeyPrefix = 'authService.validateLoginId';
    debug('Given id name was %v.', idName);
    debug('Given id value was %v.', idValue);
    if (idValue) {
      // проверка формата при наличии значения
      const validator = this.options[`${idName}FormatValidator`];
      validator(idValue, localizer);
      debug('Value format validated.');
      // если найден дубликат идентификатора другого
      // пользователя, то выбрасывается ошибка
      debug('Checking identifier duplicates.');
      const duplicate = await this.findUserByLoginIds(
        {[idName]: idValue},
        undefined,
        true,
      );
      if (duplicate && duplicate.id !== ownerId) {
        const errorKey = `${errorKeyPrefix}.duplicate${titledIdName}Error`;
        throw createError(
          HttpErrors.BadRequest,
          'DUPLICATE_LOGIN_IDENTIFIER',
          localizer.t(errorKey),
        );
      }
      debug('No duplicates found.');
    }
    debug('Identifier validated.');
  }

  /**
   * Require any login id.
   *
   * @param inputData
   * @param partial
   */
  requireAnyLoginId(data: Record<string, unknown>, partial = false) {
    const debug = this.getDebuggerFor(this.requireAnyLoginId);
    debug('Require any login identifier.');
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = 'authService.requireAnyLoginId';
    if (partial) {
      debug('Partial mode was enabled.');
    }
    // если метод запущен в режиме "partial", то для проверки наличия
    // идентификаторов используются только те идентификаторы, ключи
    // которых определены в полученном объекте, а если объект
    // не содержит ключей, то проверка завершается
    const loginIds = partial
      ? LOGIN_ID_NAMES.filter(idName => idName in data)
      : LOGIN_ID_NAMES;
    if (partial && !loginIds.length) {
      debug('No login identifier was given.');
      return;
    }
    debug('Looking for any value in %l.', loginIds);
    // если ни один идентификатор не определен,
    // то выбрасывается ошибка
    if (loginIds.every(idName => !data[idName])) {
      debug('No login identifier was given.');
      const idFields = LOGIN_ID_NAMES.filter(id => id in data);
      const singleIdField = idFields.length === 1 ? idFields[0] : undefined;
      if (singleIdField && data[singleIdField] === '')
        throw createError(
          HttpErrors.BadRequest,
          singleIdField.toUpperCase() + '_REQUIRED',
          localizer.t(`${errorKeyPrefix}.${singleIdField}RequiredError`),
        );
      throw createError(
        HttpErrors.BadRequest,
        'LOGIN_IDENTIFIER_REQUIRED',
        localizer.t(`${errorKeyPrefix}.identifierRequiredError`),
      );
    }
  }

  /**
   * Create user.
   *
   * @param ctx
   * @param data
   * @param filter
   */
  async createUser<T extends BaseUserModel>(
    inputData: WithOptionalId<T>,
    filter?: ItemFilterClause<T>,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.createUser);
    debug('Creating user.');
    const localizer = this.getService(AuthLocalizer);
    inputData = {...inputData};
    // обрезка пробелов в идентификаторах
    LOGIN_ID_NAMES.forEach(idName => {
      if (typeof inputData[idName] === 'string')
        inputData[idName] = inputData[idName].trim();
    });
    // проверка формата идентификаторов и отсутствия дубликатов
    for (const idName of LOGIN_ID_NAMES) {
      await this.validateLoginId(idName, inputData[idName]);
    }
    // хэширование пароля
    if (inputData.password) {
      this.options.passwordFormatValidator(inputData.password, localizer);
      inputData.password = await this.hashPassword(inputData.password || '');
      debug('Password hashed.');
    }
    // переопределение даты создания
    inputData.createdAt = new Date().toISOString();
    // создание пользователя
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<T>(UserModel.name);
    const res = await userRep.create(inputData, filter);
    debug('User created.');
    debug('User id was %v.', res.id);
    return res as T;
  }

  /**
   * Update user.
   *
   * @param ctx
   * @param userId
   * @param data
   * @param filter
   */
  async updateUser<T extends BaseUserModel>(
    userId: T['id'],
    inputData: Partial<T>,
    filter?: ItemFilterClause<T>,
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.updateUser);
    debug('Updating user.');
    debug('User id was %v.', userId);
    inputData = {...inputData};
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = 'authService.updateUser';
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<T>(UserModel.name);
    const existingUser = await userRep.findOne({where: {id: userId}});
    if (!existingUser)
      throw createError(
        HttpErrors.BadRequest,
        'USER_NOT_FOUND',
        localizer.t(`${errorKeyPrefix}.userNotFoundError`),
      );
    // обрезка пробелов в идентификаторах
    LOGIN_ID_NAMES.forEach(idName => {
      if (typeof inputData[idName] === 'string')
        inputData[idName] = inputData[idName].trim();
    });
    // проверка формата идентификаторов и отсутствия дубликатов
    for (const idName of LOGIN_ID_NAMES) {
      await this.validateLoginId(idName, inputData[idName], existingUser.id);
    }
    // удаление ключей идентификаторов содержащих null и undefined
    LOGIN_ID_NAMES.forEach(idName => {
      if (inputData[idName] == null) delete inputData[idName];
    });
    // хэширование пароля (при наличии)
    if (inputData.password) {
      this.options.passwordFormatValidator(inputData.password, localizer);
      inputData.password = await this.hashPassword(inputData.password || '');
      debug('Password hashed.');
    }
    // удаление даты создания
    // и формирование даты обновления
    delete inputData.createdAt;
    inputData.updatedAt = new Date().toISOString();
    // обновление документа
    const res = await userRep.patchById(userId, inputData, filter);
    debug('User updated.');
    return res as T;
  }

  /**
   * Find access token by http request.
   *
   * @param ctx
   * @param include
   */
  async findAccessTokenByHttpRequest<T extends BaseAccessTokenModel>(
    req: IncomingMessage,
    include?: IncludeClause<T>,
  ): Promise<T | undefined> {
    const debug = this.getDebuggerFor(this.findAccessTokenByHttpRequest);
    debug('Finding access token by http request.');
    const cookies = parseCookieHeader(req.headers['cookie']);
    const query = parseUrlQuery(req.url);
    let jwToken =
      req.headers[this.options.jwtHeaderName] ||
      cookies[this.options.jwtCookieName] ||
      query[this.options.jwtQueryParam];
    if (typeof jwToken === 'string') {
      jwToken = jwToken.replace('Bearer ', '');
    }
    if (!jwToken || typeof jwToken !== 'string') {
      debug('JWT not found.');
      return;
    }
    const payload = await this.decodeJwt(jwToken);
    const accessToken = await this.findAccessTokenById(payload.tid, include);
    if (!accessToken) {
      debug('Access token not found in the database.');
      return;
    }
    if (accessToken.ownerId !== payload.uid)
      throw createError(
        HttpErrors.BadRequest,
        'INVALID_ACCESS_TOKEN_OWNER',
        'Your access token not match its owner',
        payload,
      );
    debug('Access token found.');
    debug('Token id was %v.', accessToken.id);
    debug('Owner id was %v.', accessToken.ownerId);
    return accessToken as T;
  }

  /**
   * Find access token owner.
   *
   * @param accessToken
   */
  async findAccessTokenOwner<T extends BaseUserModel>(
    accessToken: BaseAccessTokenModel,
    include?: IncludeClause<T>,
  ): Promise<T | undefined> {
    const debug = this.getDebuggerFor(this.findAccessTokenOwner);
    debug('Finding access token owner.');
    if (!accessToken.ownerId) {
      debug('Access token did not have an owner.');
      return;
    }
    debug('Owner id was %v.', accessToken.ownerId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<T>(UserModel.name);
    const owner = await rep.findOne({
      where: {id: accessToken.ownerId},
      include,
    });
    if (!owner) {
      debug('Owner not found in database.');
      return;
    }
    debug('Owner found successfully.');
    return owner as T;
  }

  /**
   * Create auth session.
   *
   * @param ctx
   */
  async createAuthSession(req: IncomingMessage): Promise<AuthSession> {
    const accessToken = await this.findAccessTokenByHttpRequest(req);
    if (accessToken) {
      const user = await this.findAccessTokenOwner(
        accessToken,
        this.options.sessionUserInclusion as IncludeClause<BaseUserModel>,
      );
      return new AuthSession(this.container, req, accessToken, user);
    } else {
      return new AuthSession(this.container, req);
    }
  }
}
