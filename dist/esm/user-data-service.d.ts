import { Service } from '@e22m4u/js-service';
import { CountryCode } from 'libphonenumber-js';
/**
 * Email format regex.
 *
 * https://stackoverflow.com/a/46181
 */
export declare const EMAIL_FORMAT_REGEX: RegExp;
/**
 * User data service.
 */
export declare class UserDataService extends Service {
    /**
     * Validate username.
     *
     * @param value
     * @param options
     */
    validateUsername(value: unknown, options?: {
        minLength?: number;
        maxLength?: number;
    }): void;
    /**
     * Validate email.
     *
     * @param value
     */
    validateEmail(value: unknown): void;
    /**
     * Validate phone.
     *
     * @param value
     * @param country
     */
    validatePhone(value: unknown, country: CountryCode): void;
    /**
     * Validate password.
     *
     * @param value
     * @param options
     */
    validatePassword(value: unknown, options?: {
        minLength?: number;
        maxLength?: number;
    }): void;
}
