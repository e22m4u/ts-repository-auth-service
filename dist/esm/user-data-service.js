import HttpErrors from 'http-errors';
import { Service } from '@e22m4u/js-service';
import { createError } from './utils/index.js';
import { AuthLocalizer } from './auth-localizer.js';
import { isValidPhoneNumber } from 'libphonenumber-js';
/**
 * Email format regex.
 *
 * https://stackoverflow.com/a/46181
 */
export const EMAIL_FORMAT_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/**
 * User data service.
 */
export class UserDataService extends Service {
    /**
     * Validate username.
     *
     * @param value
     * @param options
     */
    validateUsername(value, options) {
        const minUsernameLength = options?.minLength || 4;
        const maxUsernameLength = options?.maxLength || 30;
        //
        if (typeof value !== 'string') {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('userDataService.validateUsername.invalidFormatError'), { username: value });
        }
        if (value.length < minUsernameLength) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('userDataService.validateUsername.minLengthError'), { username: value }, minUsernameLength);
        }
        if (value.length > maxUsernameLength) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('userDataService.validateUsername.maxLengthError'), { username: value }, maxUsernameLength);
        }
        if (!/^[a-zA-Z]/.test(value)) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('userDataService.validateUsername.startLetterError'), { username: value });
        }
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('userDataService.validateUsername.invalidFormatError'), { username: value });
        }
    }
    /**
     * Validate email.
     *
     * @param value
     */
    validateEmail(value) {
        if (!value ||
            typeof value !== 'string' ||
            !EMAIL_FORMAT_REGEX.test(value)) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_EMAIL_FORMAT', localizer.t('userDataService.validateEmail.invalidFormatError'), { email: value });
        }
    }
    /**
     * Validate phone.
     *
     * @param value
     * @param country
     */
    validatePhone(value, country) {
        if (!value ||
            typeof value !== 'string' ||
            !isValidPhoneNumber(value, country)) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_PHONE_FORMAT', localizer.t('userDataService.validatePhone.invalidFormatError'), { phone: value });
        }
    }
    /**
     * Validate password.
     *
     * @param value
     * @param options
     */
    validatePassword(value, options) {
        const minPasswordLength = options?.minLength || 8;
        const maxPasswordLength = options?.maxLength || 80;
        //
        if (typeof value !== 'string') {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_PASSWORD_FORMAT', localizer.t('userDataService.validatePassword.invalidFormatError'), { password: value });
        }
        if (value.length < minPasswordLength) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_PASSWORD_FORMAT', localizer.t('userDataService.validatePassword.minLengthError'), { password: value }, minPasswordLength);
        }
        if (value.length > maxPasswordLength) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_PASSWORD_FORMAT', localizer.t('userDataService.validatePassword.maxLengthError'), { password: value }, maxPasswordLength);
        }
        if (!/\p{L}/u.test(value) || !/\p{N}/u.test(value)) {
            const localizer = this.getService(AuthLocalizer);
            throw createError(HttpErrors.BadRequest, 'INVALID_PASSWORD_FORMAT', localizer.t('userDataService.validatePassword.invalidFormatError'), { password: value });
        }
    }
}
