/**
 * Base role model.
 */
export declare class BaseRoleModel<IdType = number | string> {
    id: IdType;
    name?: string;
    createdAt?: string;
}
/**
 * Role model.
 */
export declare class RoleModel<IdType = number | string> extends BaseRoleModel<IdType> {
}
/**
 * Role model definition.
 */
export declare const ROLE_MODEL_DEF: import("@e22m4u/ts-repository").ModelDefinition;
