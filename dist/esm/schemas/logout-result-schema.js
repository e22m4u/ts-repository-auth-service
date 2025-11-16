import { DataType } from '@e22m4u/ts-data-schema';
/**
 * Logout result schema.
 */
export const LOGOUT_RESULT_SCHEMA = {
    type: DataType.OBJECT,
    properties: {
        success: {
            type: DataType.BOOLEAN,
        },
    },
};
