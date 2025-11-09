import {RoleGuard} from '../role-guard.js';
import {RequestContext} from '@e22m4u/ts-rest-router';
import {RoutePreHandler} from '@e22m4u/ts-rest-router';

/**
 * Pre-handler хук для @e22m4u/js-trie-router.
 * Проверяет аутентифицированного пользователя текущей сессии
 * на соответствие списку ролей.
 *
 * @param roleName
 */
export function roleGuard(roleName?: string | string[]): RoutePreHandler {
  return function (ctx: RequestContext) {
    const guard = ctx.container.get(RoleGuard);
    guard.requireRole(roleName);
  };
}
