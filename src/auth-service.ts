import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v7 as uuidV7} from 'uuid';
import HttpErrors from 'http-errors';
import {IncomingMessage} from 'http';
import {AuthSession} from './auth-session.js';
import {AuthLocalizer} from './auth-localizer.js';
import {ServiceContainer} from '@e22m4u/js-service';
import {DebuggableService} from './debuggable-service.js';

import {
  IncludeClause,
  WithOptionalId,
  DatabaseSchema,
  ItemFilterClause,
  WhereClause,
} from '@e22m4u/js-repository';

import {
  createError,
  parseUrlQuery,
  removeEmptyKeys,
  parseCookieHeader,
} from './utils/index.js';

import {
  UserModel,
  BaseUserModel,
  AccessTokenModel,
  BaseAccessTokenModel,
} from './models/index.js';

const {JsonWebTokenError, TokenExpiredError} = jwt;

/**
 * Auth service options.
 */
export class AuthServiceOptions {
  passwordHashRounds: number = 12;
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
                'ACCESS_TOKEN_ENCODING_ERROR',
                'Unable to encode JSON web token (JWT)',
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
      if (err instanceof TokenExpiredError) {
        throw createError(
          HttpErrors.Unauthorized,
          'JWT_EXPIRED',
          'JWT is expired',
          {token: jwToken, reason: err.message},
        );
      }
      if (err instanceof JsonWebTokenError) {
        throw createError(
          HttpErrors.Unauthorized,
          'INVALID_JWT_SIGNATURE',
          'JWT signature is invalid',
          {token: jwToken, reason: err.message},
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
        HttpErrors.Unauthorized,
        'INVALID_JWT_PAYLOAD',
        'JWT payload is invalid',
        {token: jwToken, payload},
      );
    }
    debug.inspect('Payload:', payload);
    debug('JWT decoded successfully.');
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
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.findAccessTokenById);
    debug('Finding access token by id.');
    debug('Token id was %v.', tokenId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<T>(AccessTokenModel.name);
    const accessToken = await rep.findOne({where: {id: tokenId}, include});
    if (!accessToken) {
      throw createError(
        HttpErrors.Unauthorized,
        'ACCESS_TOKEN_NOT_FOUND',
        'Access token is not found in the database',
        {tokenId},
      );
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
      const reason =
        error &&
        typeof error === 'object' &&
        'message' in error &&
        error.message;
      if (!reason) {
        console.error(error);
      }
      throw createError(
        HttpErrors.InternalServerError,
        'PASSWORD_HASHING_ERROR',
        'Unable to hash the given password',
        {reason},
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
  verifyPassword(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<true>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  verifyPassword(
    password: string | undefined,
    hash: string | undefined,
    silent: false,
  ): Promise<true>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  verifyPassword(
    password: string | undefined,
    hash: string | undefined,
    silent: true,
  ): Promise<boolean>;

  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  verifyPassword(
    password: string | undefined,
    hash: string | undefined,
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
    password: string | undefined,
    hash: string | undefined,
    silent = false,
  ): Promise<boolean> {
    const debug = this.getDebuggerFor(this.verifyPassword);
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = 'authService.verifyPassword';
    debug('Verifying password');
    if (!password && !hash) {
      debug('No password or hash specified.');
      return true;
    }
    if (typeof password !== 'string' || typeof hash !== 'string') {
      throw createError(
        HttpErrors.Unauthorized,
        'INVALID_PASSWORD',
        localizer.t(`${errorKeyPrefix}.invalidPasswordError`),
      );
    }
    let isValid = false;
    try {
      isValid = await bcrypt.compare(password, hash);
    } catch (error) {
      console.error(error);
      throw createError(
        HttpErrors.Unauthorized,
        'INVALID_PASSWORD',
        'Unable to verify the given password',
      );
    }
    if (!isValid) {
      if (silent) return false;
      throw createError(
        HttpErrors.Unauthorized,
        'INVALID_PASSWORD',
        localizer.t(`${errorKeyPrefix}.invalidPasswordError`),
      );
    }
    debug('Password verified.');
    return true;
  }

  /**
   * Find user before login.
   *
   * @param where
   */
  async findUserBeforeLogin<T extends BaseUserModel>(where: WhereClause<T>) {
    const localizer = this.getService(AuthLocalizer);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<T>(UserModel.name);
    const user = await userRep.findOne({where});
    if (!user) {
      throw createError(
        HttpErrors.Unauthorized,
        'USER_NOT_FOUND',
        localizer.t(`authService.findUserBeforeLogin.notFoundError`),
      );
    }
    return user;
  }

  /**
   * Find user before login.
   *
   * @param where
   */
  async ensureUserDoesNotExist<T extends BaseUserModel>(
    where: WhereClause<T>,
    excludeUserId?: T['id'],
  ) {
    const localizer = this.getService(AuthLocalizer);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<T>(UserModel.name);
    const user = await userRep.findOne({where});
    if (user && user.id !== excludeUserId) {
      throw createError(
        HttpErrors.Conflict,
        'DUPLICATE_USER',
        localizer.t(`authService.ensureUserDoesNotExist.duplicateError`),
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
    inputData = {...inputData};
    // хэширование пароля
    if (inputData.password) {
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
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = 'authService.updateUser';
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository<T>(UserModel.name);
    // удаление идентификатора из новых данных
    inputData = {...inputData};
    delete inputData.id;
    // проверка существования пользователя
    const existingUser = await userRep.findOne({where: {id: userId}});
    if (!existingUser)
      throw createError(
        HttpErrors.BadRequest,
        'USER_NOT_FOUND',
        localizer.t(`${errorKeyPrefix}.userNotFoundError`),
      );
    // хэширование пароля (при наличии)
    if (inputData.password) {
      inputData.password = await this.hashPassword(inputData.password || '');
      debug('Password hashed.');
    }
    // удаление даты создания из новых данных
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
      debug('Access token not found in the client request.');
      return;
    }
    const payload = await this.decodeJwt(jwToken);
    const accessToken = await this.findAccessTokenById(payload.tid, include);
    if (accessToken.ownerId !== payload.uid)
      throw createError(
        HttpErrors.BadRequest,
        'INVALID_ACCESS_TOKEN_OWNER',
        'JWT does not match its access token owner',
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
  ): Promise<T> {
    const debug = this.getDebuggerFor(this.findAccessTokenOwner);
    debug('Finding access token owner.');
    if (!accessToken.ownerId) {
      throw createError(
        HttpErrors.InternalServerError,
        'ACCESS_TOKEN_OWNER_NOT_FOUND',
        'Access token does not have an owner',
        {accessTokenId: accessToken.id},
      );
    }
    debug('Owner id was %v.', accessToken.ownerId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository<T>(UserModel.name);
    const owner = await rep.findOne({
      where: {id: accessToken.ownerId},
      include,
    });
    if (!owner) {
      throw createError(
        HttpErrors.InternalServerError,
        'ACCESS_TOKEN_OWNER_NOT_FOUND',
        'Access token owner is not found in the database',
        {accessTokenId: accessToken.id, ownerId: accessToken.ownerId},
      );
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
