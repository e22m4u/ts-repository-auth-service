import { IncomingMessage } from 'http';
import { AuthSession } from './auth-session.js';
import { ServiceContainer } from '@e22m4u/js-service';
import { DebuggableService } from './debuggable-service.js';
import { IncludeClause, WithOptionalId, ItemFilterClause, WhereClause } from '@e22m4u/js-repository';
import { BaseUserModel, AccessTokenModel, BaseAccessTokenModel } from './models/index.js';
/**
 * Auth service options.
 */
export declare class AuthServiceOptions {
    passwordHashRounds: number;
    jwtSecret: string;
    jwtTtl: number;
    jwtHeaderName: string;
    jwtCookieName: string;
    jwtQueryParam: string;
    sessionUserInclusion: IncludeClause;
    /**
     * Constructor.
     *
     * @param options
     */
    constructor(options?: Partial<AuthServiceOptions>);
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
export declare class AuthService extends DebuggableService {
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
    constructor(container?: ServiceContainer, options?: Partial<AuthServiceOptions>);
    /**
     * Create access token.
     *
     * @param user
     */
    createAccessToken<T extends BaseAccessTokenModel>(ownerId: string | number, patch?: Partial<T>): Promise<T>;
    /**
     * Remove access token by id.
     *
     * @param tokenId
     */
    removeAccessTokenById(accessTokenId: AccessTokenModel['id']): Promise<boolean>;
    /**
     * Issue JSON Web Token.
     *
     * @param accessToken
     */
    issueJwt(accessToken: BaseAccessTokenModel): Promise<JwtIssueResult>;
    /**
     * Decode Jwt.
     *
     * @param jwToken
     */
    decodeJwt(jwToken: string): Promise<JwtPayload>;
    /**
     * Find access token by id.
     *
     * @param jwToken
     * @param include
     */
    findAccessTokenById<T extends BaseAccessTokenModel>(tokenId: string, include?: IncludeClause<T>): Promise<T>;
    /**
     * Hash password.
     *
     * @param password
     */
    hashPassword(password: string): Promise<string>;
    /**
     * Verify password.
     *
     * @param password
     * @param hash
     * @param silent
     */
    verifyPassword(password: string | undefined, hash: string | undefined): Promise<true>;
    /**
     * Verify password.
     *
     * @param password
     * @param hash
     * @param silent
     */
    verifyPassword(password: string | undefined, hash: string | undefined, silent: false): Promise<true>;
    /**
     * Verify password.
     *
     * @param password
     * @param hash
     * @param silent
     */
    verifyPassword(password: string | undefined, hash: string | undefined, silent: true): Promise<boolean>;
    /**
     * Verify password.
     *
     * @param password
     * @param hash
     * @param silent
     */
    verifyPassword(password: string | undefined, hash: string | undefined, silent?: boolean): Promise<boolean>;
    /**
     * Find user before login.
     *
     * @param where
     */
    findUserBeforeLogin<T extends BaseUserModel>(where: WhereClause<T>): Promise<{ [k in keyof T]: T[k]; }>;
    /**
     * Find user before login.
     *
     * @param where
     */
    ensureUserDoesNotExist<T extends BaseUserModel>(where: WhereClause<T>, excludeUserId?: T['id']): Promise<{ [k in keyof T]: T[k]; } | undefined>;
    /**
     * Create user.
     *
     * @param ctx
     * @param data
     * @param filter
     */
    createUser<T extends BaseUserModel>(inputData: WithOptionalId<T>, filter?: ItemFilterClause<T>): Promise<T>;
    /**
     * Update user.
     *
     * @param ctx
     * @param userId
     * @param data
     * @param filter
     */
    updateUser<T extends BaseUserModel>(userId: T['id'], inputData: Partial<T>, filter?: ItemFilterClause<T>): Promise<T>;
    /**
     * Find access token by http request.
     *
     * @param ctx
     * @param include
     */
    findAccessTokenByHttpRequest<T extends BaseAccessTokenModel>(req: IncomingMessage, include?: IncludeClause<T>): Promise<T | undefined>;
    /**
     * Find access token owner.
     *
     * @param accessToken
     */
    findAccessTokenOwner<T extends BaseUserModel>(accessToken: BaseAccessTokenModel, include?: IncludeClause<T>): Promise<T>;
    /**
     * Create auth session.
     *
     * @param ctx
     */
    createAuthSession(req: IncomingMessage): Promise<AuthSession>;
}
