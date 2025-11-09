/**
 * Парсит строку заголовка 'Cookie' и возвращает объект с парами ключ-значение.
 *
 * @param cookieHeader
 */
export declare function parseCookieHeader(cookieHeader: string | null | undefined): Record<string, string | undefined>;
