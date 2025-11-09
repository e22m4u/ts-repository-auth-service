import HttpErrors from 'http-errors';
import {createError} from '../utils/index.js';
import {AuthLocalizer} from '../auth-localizer.js';
import {ServiceContainer} from '@e22m4u/js-service';
import {DataFormatValidator} from '../auth-service.js';

/**
 * Email format regex.
 *
 * https://stackoverflow.com/a/46181
 */
export const EMAIL_FORMAT_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email format validator.
 *
 * @param value
 */
export const emailFormatValidator: DataFormatValidator = function (
  value: unknown,
  container: ServiceContainer,
): void {
  if (!value || typeof value !== 'string' || !EMAIL_FORMAT_REGEX.test(value)) {
    const localizer = container.get(AuthLocalizer);
    throw createError(
      HttpErrors.BadRequest,
      'INVALID_EMAIL_FORMAT',
      localizer.t('validators.dataFormatValidator.invalidEmailFormatError'),
      {email: value},
    );
  }
};
