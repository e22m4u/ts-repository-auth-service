import {
  model,
  property,
  DataType,
  PropertyUniqueness,
  getModelDefinitionFromClass,
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

/**
 * Role model definition.
 */
export const ROLE_MODEL_DEF = getModelDefinitionFromClass(RoleModel);
