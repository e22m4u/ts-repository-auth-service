import { BaseUserModel } from './user-model.js';
/**
 * Base access token model.
 */
export declare class BaseAccessTokenModel<IdType = number | string, UserType extends BaseUserModel = BaseUserModel> {
    id: IdType;
    userAgent?: string;
    createdAt?: string;
    ownerId?: UserType['id'];
    owner?: UserType;
}
/**
 * Access token model.
 */
export declare class AccessTokenModel<IdType = number | string, UserType extends BaseUserModel = BaseUserModel> extends BaseAccessTokenModel<IdType, UserType> {
}
/**
 * Access token model definition.
 */
export declare const ACCESS_TOKEN_MODEL_DEF: import("@e22m4u/ts-repository").ModelDefinition;
