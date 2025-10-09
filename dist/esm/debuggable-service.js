import { createDebugger } from '@e22m4u/js-debug';
import { DebuggableService as BaseDebuggableService } from '@e22m4u/js-service';
/**
 * Module debugger namespace.
 */
export const MODULE_DEBUGGER_NAMESPACE = 'tsRestRouterAuth';
/**
 * Debuggable service.
 */
export class DebuggableService extends BaseDebuggableService {
    /**
     * Constructor.
     *
     * @param container
     */
    constructor(container) {
        super(container, {
            namespace: MODULE_DEBUGGER_NAMESPACE,
            noEnvironmentNamespace: true,
        });
    }
}
/**
 * Debugger.
 */
export const debugFn = createDebugger(MODULE_DEBUGGER_NAMESPACE).withoutEnvNs();
