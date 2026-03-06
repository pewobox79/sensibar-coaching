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
        '&amp;': '&',
        '&bdquo;': '„',
        '&ndash;': '–',
        '&mdash;': '—',
        '&ldquo;': '“',
        '&rdquo;': '”',
        '&euro;': '€',
        '&lt;': '<',
        '&gt;': '>',
        '&middot;': '·',
        '&bull;': '•',
        '&sect;': '§'

    };

    const pattern = /&(uuml|auml|ouml|Uuml|Auml|Ouml|szlig|nbsp|amp|bdquo|ndash|mdash|ldquo|rdquo|euro|lt|gt|middot|bull|sect);/g;

    return value.replace(pattern, (match) => replacements[match] ?? match);
};