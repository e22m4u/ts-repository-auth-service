import HttpErrors from 'http-errors';
import {createError} from './utils/index.js';
import {AuthSession} from './auth-session.js';
import {AuthLocalizer} from './auth-localizer.js';
import {DebuggableService} from '@e22m4u/js-service';

/**
 * Access rule.
 */
export const AccessRule = {
  AUTHENTICATED: '$authenticated',
} as const;

/**
 * Type of AccessRule.
 */
export type AccessRule = (typeof AccessRule)[keyof typeof AccessRule];

/**
 * Access guard.
 */
export class AccessGuard extends DebuggableService {
  /**
   * Require role.
   */
  requireRole(roleName?: string | string[]) {
    const debug = this.getDebuggerFor(this.requireRole);
    const session = this.getRegisteredService(AuthSession);
    const method = session.getRequestMethod();
    const pathname = session.getRequestPathname();
    debug('Role checking for %s %v.', method, pathname);
    const localizer = this.getRegisteredService(AuthLocalizer);
    // если пользователь не авторизован,
    // то выбрасывается ошибка
    if (!session.isLoggedIn)
      throw createError(
        HttpErrors.Unauthorized,
        'AUTHORIZATION_REQUIRED',
        localizer.t('accessGuard.requireRole.authenticationRequired'),
      );
    debug('User id was %v.', session.getUserId());
    // если требуемые роли не указаны, то допускается
    // любой аутентифицированный пользователь
    const roleNames = [roleName].flat().filter(Boolean);
    if (!roleNames.length || roleNames.includes(AccessRule.AUTHENTICATED)) {
      debug('No required role given.');
      return;
    } else if (roleNames.length === 1) {
      debug('Required role was %v.', roleNames[0]);
    } else if (roleNames.length > 1) {
      debug('Required roles was %l.', roleNames);
    }
    // проверка наличия нужной роли
    const userRoles = session.getRoleNames();
    const isAllowed = userRoles.some(v => roleNames.includes(v));
    if (!isAllowed)
      throw createError(
        HttpErrors.Forbidden,
        'ROLE_NOT_ALLOWED',
        localizer.t('accessGuard.requireRole.roleNotAllowed'),
      );
    debug('Access allowed.');
  }
}
