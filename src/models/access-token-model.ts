import {UserModel, BaseUserModel} from './user-model.js';

import {
  model,
  property,
  relation,
  DataType,
  RelationType,
  getModelDefinitionFromClass,
} from '@e22m4u/ts-repository';

/**
 * Base access token model.
 */
@model()
export class BaseAccessTokenModel<
  IdType = number | string,
  UserType extends BaseUserModel = BaseUserModel,
> {
  @property({
    type: DataType.ANY,
    primaryKey: true,
  })
  id!: IdType;

  @property({
    type: DataType.STRING,
    default: '',
  })
  userAgent?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  createdAt?: string;

  @property({
    type: DataType.ANY,
    required: true,
  })
  ownerId?: UserType['id'];

  @relation({
    type: RelationType.BELONGS_TO,
    model: UserModel.name,
    foreignKey: 'ownerId',
  })
  owner?: UserType;
}

/**
 * Access token model.
 */
@model()
export class AccessTokenModel<
  IdType = number | string,
  UserType extends BaseUserModel = BaseUserModel,
> extends BaseAccessTokenModel<IdType, UserType> {}

/**
 * Access token model definition.
 */
export const ACCESS_TOKEN_MODEL_DEF =
  getModelDefinitionFromClass(AccessTokenModel);
