import { BaseRoleModel } from './role-model.js';
/**
 * Base user model.
 */
export declare class BaseUserModel<IdType = number | string, RoleType extends BaseRoleModel = BaseRoleModel> {
    id: IdType;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
    roleIds?: RoleType['id'][];
    roles?: RoleType[];
}
/**
 * User model.
 */
export declare class UserModel<IdType = number | string, RoleType extends BaseRoleModel = BaseRoleModel> extends BaseUserModel<IdType, RoleType> {
}
