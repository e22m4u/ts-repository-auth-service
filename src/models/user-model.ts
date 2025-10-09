import {
  model,
  property,
  relation,
  DataType,
  RelationType,
  PropertyUniqueness,
} from '@e22m4u/ts-repository';

import {noInput, noOutput} from '@e22m4u/ts-projection';

import {RoleModel, BaseRoleModel} from './role-model.js';

/**
 * Base user model.
 */
@model()
export class BaseUserModel<
  IdType = number | string,
  RoleType extends BaseRoleModel = BaseRoleModel,
> {
  @property({
    type: DataType.ANY,
    primaryKey: true,
  })
  id!: IdType;

  @property({
    type: DataType.STRING,
    unique: PropertyUniqueness.SPARSE,
    default: '',
  })
  username?: string;

  @property({
    type: DataType.STRING,
    unique: PropertyUniqueness.SPARSE,
    default: '',
  })
  email?: string;

  @property({
    type: DataType.STRING,
    unique: PropertyUniqueness.SPARSE,
    default: '',
  })
  phone?: string;

  @property({
    type: DataType.STRING,
    default: '',
  })
  @noOutput()
  password?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  @noInput()
  createdAt?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  updatedAt?: string;

  @property({
    type: DataType.ARRAY,
    itemType: DataType.ANY,
    default: () => [],
  })
  roleIds?: RoleType['id'][];

  @relation({
    type: RelationType.REFERENCES_MANY,
    model: RoleModel.name,
    foreignKey: 'roleIds',
  })
  roles?: RoleType[];
}

/**
 * User model.
 */
@model()
export class UserModel<
  IdType = number | string,
  RoleModel extends BaseRoleModel = BaseRoleModel,
> extends BaseUserModel<IdType, RoleModel> {}
