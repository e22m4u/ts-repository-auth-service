import { RoutePreHandler } from '@e22m4u/ts-rest-router';
/**
 * Pre-handler хук для @e22m4u/js-trie-router.
 * Проверяет аутентифицированного пользователя текущей сессии
 * на соответствие списку ролей.
 *
 * @param roleName
 */
export declare function roleGuard(roleName?: string | string[]): RoutePreHandler;
