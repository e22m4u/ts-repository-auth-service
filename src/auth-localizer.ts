import {Localizer} from '@e22m4u/js-localizer';
import {ServiceContainer} from '@e22m4u/js-service';
import {LocalizerOptions} from '@e22m4u/js-localizer';
import en from './locales/en.json' with {type: 'json'};
import ru from './locales/ru.json' with {type: 'json'};

/**
 * Auth localizer.
 */
export class AuthLocalizer extends Localizer {
  constructor(container?: ServiceContainer, options?: LocalizerOptions) {
    super(container, {
      dictionaries: {en, ru},
      ...options,
    });
  }
}
