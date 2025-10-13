export function slugify(title:string) {
    return title
        .toLowerCase()
        .normalize("NFD")                  // Umlaute etc. trennen (ä -> a + ¨)
        .replace(/[\u0300-\u036f]/g, "")   // diakritische Zeichen entfernen
        .replace(/["'&]/g, "")             // Anführungszeichen & entfernen
        .replace(/[^a-z0-9]+/g, "-")       // alles außer Buchstaben/Zahlen -> -
        .replace(/^-+|-+$/g, "")           // führende/trailing - entfernen
        .replace(/--+/g, "-");             // doppelte - zusammenfassen
}