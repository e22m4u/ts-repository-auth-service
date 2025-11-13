import {DataSchema, DataType} from '@e22m4u/ts-data-schema';

/**
 * User lookup schema.
 */
export const USER_LOOKUP_SCHEMA: DataSchema = {
  type: DataType.OBJECT,
  properties: {
    username: {
      type: DataType.STRING,
    },
    email: {
      type: DataType.STRING,
    },
    phone: {
      type: DataType.STRING,
    },
  },
  required: true,
};
