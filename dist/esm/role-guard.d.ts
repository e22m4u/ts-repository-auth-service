import { DebuggableService } from '@e22m4u/js-service';
/**
 * Access rule.
 */
export declare const AccessRule: {
    readonly AUTHENTICATED: "$authenticated";
};
/**
 * Type of AccessRule.
 */
export type AccessRule = (typeof AccessRule)[keyof typeof AccessRule];
/**
 * Access guard.
 */
export declare class RoleGuard extends DebuggableService {
    /**
     * Require role.
     */
    requireRole(roleName?: string | string[]): void;
}
