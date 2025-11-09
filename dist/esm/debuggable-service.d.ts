import { ServiceContainer } from '@e22m4u/js-service';
import { DebuggableService as BaseDebuggableService } from '@e22m4u/js-service';
/**
 * Module debugger namespace.
 */
export declare const MODULE_DEBUGGER_NAMESPACE = "jsRepositoryAuthService";
/**
 * Debuggable service.
 */
export declare class DebuggableService extends BaseDebuggableService {
    /**
     * Constructor.
     *
     * @param container
     */
    constructor(container?: ServiceContainer);
}
