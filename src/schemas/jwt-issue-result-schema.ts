import {DataSchema, DataType} from '@e22m4u/ts-data-schema';

/**
 * Jwt issue result schema.
 */
export const JWT_ISSUE_RESULT_SCHEMA: DataSchema = {
  type: DataType.OBJECT,
  properties: {
    token: {
      type: DataType.STRING,
    },
    expiresAt: {
      type: DataType.STRING,
    },
    user: {
      type: DataType.OBJECT,
    },
  },
};
