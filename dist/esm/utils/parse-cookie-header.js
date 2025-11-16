/**
 * Парсит строку заголовка 'Cookie' и возвращает объект с парами ключ-значение.
 *
 * @param cookieHeader
 */
export function parseCookieHeader(cookieHeader) {
    if (!cookieHeader) {
        return {};
    }
    return cookieHeader.split(';').reduce((acc, cookie) => {
        const eqIndex = cookie.indexOf('=');
        if (eqIndex === -1) {
            return acc;
        }
        const key = cookie.substring(0, eqIndex).trim();
        let value = cookie.substring(eqIndex + 1).trim();
        if (!key) {
            return acc;
        }
        try {
            value = decodeURIComponent(value);
        }
        catch {
            // non-decodable URI component, fall back to the raw value
            // console.error(`Failed to decode cookie value: "${value}"`, e);
        }
        acc[key] = value;
        return acc;
    }, {});
}
