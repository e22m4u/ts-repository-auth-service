import { RoleGuard } from '../role-guard.js';
/**
 * Pre-handler хук для @e22m4u/js-trie-router.
 * Проверяет аутентифицированного пользователя текущей сессии
 * на соответствие списку ролей.
 *
 * @param roleName
 */
export function roleGuard(roleName) {
    return function (ctx) {
        const guard = ctx.container.get(RoleGuard);
        guard.requireRole(roleName);
    };
}
