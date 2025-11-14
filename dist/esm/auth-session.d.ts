import { IncomingMessage } from 'http';
import { DebuggableService, ServiceContainer } from '@e22m4u/js-service';
import { BaseUserModel, BaseRoleModel, BaseAccessTokenModel } from './models/index.js';
/**
 * Auth session.
 */
export declare class AuthSession<UserType extends BaseUserModel = BaseUserModel, TokenType extends BaseAccessTokenModel = BaseAccessTokenModel> extends DebuggableService {
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
    get isLoggedIn(): boolean;
    /**
     * Constructor.
     *
     * @param user
     */
    constructor(container: ServiceContainer, httpRequest: IncomingMessage, accessToken?: TokenType | undefined, user?: UserType | undefined);
    /**
     * Get request method.
     */
    getRequestMethod(): string;
    /**
     * Get request pathname.
     */
    getRequestPathname(): string;
    /**
     * Get user.
     */
    getUser(): UserType;
    /**
     * User id.
     */
    getUserId(): UserType['id'];
    /**
     * Get user roles.
     */
    getUserRoles<T extends BaseRoleModel>(): T[];
    /**
     * Get role names.
     */
    getRoleNames(): string[];
    /**
     * Get access token.
     */
    getAccessToken(): TokenType;
    /**
     * Access token id.
     */
    getAccessTokenId(): TokenType['id'];
}
