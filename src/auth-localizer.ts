import {ServiceContainer} from '@e22m4u/js-service';
import {Localizer, LocalizerOptions} from '@e22m4u/ts-localizer';
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
