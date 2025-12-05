export const isPastEvent = (date: string) => {
    if (!date) return false;
    const eventDate = new Date(date);
    const today = new Date();

    return eventDate < today

}