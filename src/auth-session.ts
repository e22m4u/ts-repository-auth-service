import HttpErrors from 'http-errors';
import {IncomingMessage} from 'http';
import {createError} from './utils/index.js';
import {BaseRoleModel} from './models/index.js';
import {AuthLocalizer} from './auth-localizer.js';
import {UserModel, BaseUserModel} from './models/index.js';
import {DebuggableService, ServiceContainer} from '@e22m4u/js-service';
import {AccessTokenModel, BaseAccessTokenModel} from './models/index.js';

/**
 * Auth session.
 */
export class AuthSession<
  UserType extends BaseUserModel = UserModel,
  TokenType extends BaseAccessTokenModel = AccessTokenModel,
> extends DebuggableService {
  /**
   * Http request.
   */
  protected httpRequest: IncomingMessage;

  /**
   * Access token.
   */
  protected accessToken?: TokenType;

  /**
   * User.
   */
  protected user?: UserType;

  /**
   * Is logged in.
   */
  get isLoggedIn() {
    return Boolean(this.accessToken) && Boolean(this.user);
  }

  /**
   * Constructor.
   *
   * @param user
   */
  constructor(
    container: ServiceContainer,
    httpRequest: IncomingMessage,
    accessToken?: TokenType | undefined,
    user?: UserType | undefined,
  ) {
    super(container);
    this.httpRequest = httpRequest;
    this.accessToken = accessToken;
    this.user = user;
  }

  /**
   * Get request method.
   */
  getRequestMethod() {
    return this.httpRequest.method || '';
  }

  /**
   * Get request pathname.
   */
  getRequestPathname() {
    return (this.httpRequest.url || '').replace(/(#.*)|(\?.*)/, '');
  }

  /**
   * Get user.
   */
  getUser(): UserType {
    if (!this.user) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(
        HttpErrors.Unauthorized,
        'AUTHENTICATION_REQUIRED',
        localizer.t('authSession.getUser.authenticationRequired'),
      );
    }
    return this.user;
  }

  /**
   * User id.
   */
  getUserId(): UserType['id'] {
    return this.getUser().id;
  }

  /**
   * Get user roles.
   */
  getUserRoles<T extends BaseRoleModel>(): T[] {
    return (this.getUser().roles || []) as T[];
  }

  /**
   * Get role names.
   */
  getRoleNames(): string[] {
    return this.getUserRoles()
      .map(v => v.name)
      .filter(v => typeof v === 'string');
  }

  /**
   * Get access token.
   */
  getAccessToken(): TokenType {
    if (!this.accessToken) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(
        HttpErrors.Unauthorized,
        'AUTHENTICATION_REQUIRED',
        localizer.t('authSession.getAccessTokenId.authenticationRequired'),
      );
    }
    return this.accessToken;
  }

  /**
   * Access token id.
   */
  getAccessTokenId(): TokenType['id'] {
    return this.getAccessToken().id;
  }
}
