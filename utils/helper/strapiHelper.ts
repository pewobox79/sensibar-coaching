export const isPastEvent = (date: string) => {
    if (!date) return false;
    const eventDate = new Date(date);
    const today = new Date();

    return eventDate < today

}

export const formatVowel = (value: string): string => {
    const replacements: Record<string, string> = {
        '&uuml;': 'ü',
        '&auml;': 'ä',
        '&ouml;': 'ö',
        '&Uuml;': 'Ü',
        '&Auml;': 'Ä',
        '&Ouml;': 'Ö',
        '&szlig;': 'ß',
        '&nbsp;': ' ',
        '&amp;': '&', // keep last (see note below)
    };

    const pattern = /&(uuml|auml|ouml|Uuml|Auml|Ouml|szlig|nbsp|amp);/g;

    return value.replace(pattern, (match) => replacements[match] ?? match);
};