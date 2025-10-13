import { useState, useEffect } from 'preact/hooks';

/**
 * Кастомный хук для отслеживания CSS медиа-запросов в Preact.
 * @param query - Строка медиа-запроса (например, '(max-width: 768px)').
 * @returns {boolean} - Возвращает `true`, если медиа-запрос соответствует, иначе `false`.
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = () => {
            setMatches(media.matches);
        };

        listener();

        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}
