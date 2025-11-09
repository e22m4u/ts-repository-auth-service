import HttpErrors from 'http-errors';
import { createError } from './utils/index.js';
import { AuthLocalizer } from './auth-localizer.js';
import { DebuggableService } from '@e22m4u/js-service';
/**
 * Auth session.
 */
export class AuthSession extends DebuggableService {
    /**
     * Http request.
     */
    httpRequest;
    /**
     * Access token.
     */
    accessToken;
    /**
     * User.
     */
    user;
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
    constructor(container, httpRequest, accessToken, user) {
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
    getUser() {
        if (!this.user) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.Unauthorized, 'AUTHENTICATION_REQUIRED', localizer.t('authSession.getUser.authenticationRequired'));
        }
        return this.user;
    }
    /**
     * User id.
     */
    getUserId() {
        return this.getUser().id;
    }
    /**
     * Get user roles.
     */
    getUserRoles() {
        return (this.getUser().roles || []);
    }
    /**
     * Get role names.
     */
    getRoleNames() {
        return this.getUserRoles()
            .map(v => v.name)
            .filter(v => typeof v === 'string');
    }
    /**
     * Get access token.
     */
    getAccessToken() {
        if (!this.accessToken) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.Unauthorized, 'AUTHENTICATION_REQUIRED', localizer.t('authSession.getAccessTokenId.authenticationRequired'));
        }
        return this.accessToken;
    }
    /**
     * Access token id.
     */
    getAccessTokenId() {
        return this.getAccessToken().id;
    }
}
