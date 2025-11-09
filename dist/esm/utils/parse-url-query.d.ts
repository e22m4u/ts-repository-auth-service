/**
 * Парсит query-параметры из строки URL и возвращает их в виде объекта.
 * Эта упрощенная версия не обрабатывает повторяющиеся ключи как массивы.
 * Если ключ встречается несколько раз, будет сохранено только последнее
 * значение.
 *
 * @param urlString Строка URL (например, '/api/users?id=123&page=2').
 */
export declare function parseUrlQuery(urlString: string | null | undefined): Record<string, string | undefined>;
