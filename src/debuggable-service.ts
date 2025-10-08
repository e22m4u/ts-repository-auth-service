import {createDebugger} from '@e22m4u/js-debug';
import {ServiceContainer} from '@e22m4u/js-service';
import {DebuggableService as BaseDebuggableService} from '@e22m4u/js-service';

/**
 * Module debugger namespace.
 */
export const MODULE_DEBUGGER_NAMESPACE = 'jsTrieRouterAuth';

/**
 * Debuggable service.
 */
export class DebuggableService extends BaseDebuggableService {
  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container?: ServiceContainer) {
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
