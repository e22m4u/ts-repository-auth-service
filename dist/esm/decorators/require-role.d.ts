import { beforeAction } from '@e22m4u/ts-rest-router';
/**
 * Before action декоратор для @e22m4u/ts-rest-router.
 * Проверяет аутентифицированного пользователя текущей сессии
 * на соответствие списку ролей.
 *
 * @param roleName
 */
export declare function requireRole(roleName: string | string[]): ReturnType<typeof beforeAction>;
