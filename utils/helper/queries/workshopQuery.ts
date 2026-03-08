import qs from "qs";

export const WorkshopQuery = qs.stringify({
    populate: {
        location: {
            fields: ['city']
        },
        speaker: {
            fields: ["name"]
        }
    }
}, {
    encodeValuesOnly: true
})

export const SingleWorkshopQuery = qs.stringify({
    populate: {
        location: {
            fields: ['city', 'street', 'zipCode', 'country']
        },
        speaker: {
            populate: {
                image: {
                    fields: ["formats", "alternativeText"]
                }
            }
        }
    }
}, {
    encodeValuesOnly: true
})