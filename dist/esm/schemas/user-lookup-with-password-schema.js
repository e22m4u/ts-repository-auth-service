import { DataType } from '@e22m4u/ts-data-schema';
/**
 * User lookup with password schema.
 */
export const USER_LOOKUP_WITH_PASSWORD_SCHEMA = {
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
        password: {
            type: DataType.STRING,
        },
    },
    required: true,
};
