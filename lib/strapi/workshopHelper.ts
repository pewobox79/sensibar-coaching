const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URL_DEV

const config = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
    },
    next: {revalidate: 60}
}
export const getAllWorkshops = async () => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops?populate=*`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
            },
            next: {revalidate: 20}
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${ response.status }`)
        }
        return await response.json()
    } catch (e) {

        console.log("workshop fetch failed", e);
    }

}

export const getSingleWorkshop = async (id: string | unknown) => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops/${ id }?populate=*`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
            },
            next: {revalidate: 20}
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${ response.status }`)
        }
        return await response.json()
    } catch (e) {

        console.log("workshop fetch failed", e);
    }
}

export const checkIfContactExists = async (firstname: string, lastname: string, email: string, query: string = "contacts") => {

    try {
        const response = await fetch(`${ STRAPI_URI }/api/${ query }?filters[contact][email][$eq]=${ email }&filters[personalData][firstname][$eq]=${ firstname }&filters[personalData][lastname][$eq]=${ lastname }&populate=contact`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
            },
            next: {revalidate: 20}
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${ response.status }`)
        }

        const json = await response.json()

        if (json.data.length === 0 || undefined) {
            return {msg: "new contact"}
        } else {
            return {msg: "contact already exists", data: json.data}
        }


    } catch (e) {

        console.log("contact check failed", e);
    }
}


export const addContactToWorkshop = async (contactId: string, workshopId: string, updatedArray?: unknown[]) => {

    const newData = {
        data: {
            contacts: updatedArray
        }
    }
    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops/${ workshopId }?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
            },
            body: JSON.stringify(newData)
        })

        const updatedWorkshop = await response.json()

        return {msg: "Kontakt zu Workshop hinzugefügt", data: updatedWorkshop.data}


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "workshop contact update fehlerhaft."}

    }

}


export const executeDoubleOptIn = async (id: string | null, workshopLink: string, title: string, workshop_date: string) => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/${ id }?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN }`
            },
            body: JSON.stringify({
                data: {
                    gdpr: true
                }
            })
        })


        const data = await response.json();

        if (data) {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.data.personalData.firstname,
                    id: data.data.documentId,
                    workshopLink: workshopLink,
                    workshopDate: workshop_date,
                    workshopTitle: title,
                    email: data.data.contact[0].email,
                    location: data.data.location,
                    workshopType: data.data.type
                })
            }

            const response = await fetch(`/api/db/doi`, config)
            return await response.json();

        }


    } catch (e) {
        console.log("double opt in update failed", e)
    }
}

export const getSingleContactForSingleWorkshop = async (id: string) => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/${ id }?populate=personalData&populate=condition_status&sort=personalData.firstname:asc`, config)
        const clientData = await response.json()
        return await clientData.data

    } catch (e) {

        console.error('Error fetching basic page content:', e)
    }


}

export const getWorkshopContacts = async (id: string) => {

    return await getSingleContactForSingleWorkshop(id as string)


}

export const getSingleContactEmail = async (id: string) => {

    try {

        const response = await fetch(`${ STRAPI_URI }/api/contacts/${ id }?populate=contact`, config)
        const clientData = await response.json()
        return await clientData.data

    } catch (e) {

        console.error('Error fetching basic page content:', e)
    }

}


export const generateMailingList = async (contactList: []) => {
    const emailList = [];

    const handleGetContact = async (id: string) => {
        try {
            const response = await getSingleContactEmail(id);
            return response.contact[0].email;

        } catch (e) {
            console.error('Error fetching single contact email:', e);
            return null; // Return null to handle errors gracefully
        }
    };

    // Map contactList to an array of promises
    const emailPromises = contactList.map((contact: { documentId: string }) =>
        handleGetContact(contact.documentId)
    );

    try {
        // Resolve all promises and filter out null values (failed requests)
        const emails = await Promise.all(emailPromises);
        emailList.push(...emails.filter((email: string) => email !== null));
    } catch (e) {
        console.error('Error generating mailing list:', e);
    }

    return [...new Set(emailList)];
};


export const updateWorkshopStatus = async (workshopId: string, state: "cancelled" | "planned" | "confirmed" = "planned", token: string) => {

    const newData = {
        data: {
            ws_status: state
        }
    }
    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops/${ workshopId }?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ token }`
            },
            body: JSON.stringify(newData),
            next: {revalidate: 20}
        })

        const updatedWorkshop = await response.json()

        if (updatedWorkshop.data != null) {
            return {msg: "workshop updated", workshop: updatedWorkshop.data.title}

        } else {
            return {msg: "workshop update failed"}
        }


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "workshop contact update fehlerhaft."}

    }

}

export const updateWorkshop = async (workshopId: string, data: unknown, token: string) => {

    const newData = {
        data: data

    }
    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops/${ workshopId }?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ token }`
            },
            body: JSON.stringify(newData),
            next: {revalidate: 20}
        })

        const updatedWorkshop = await response.json()

        if (updatedWorkshop.data != null) {
            return {msg: "workshop updated", workshop: updatedWorkshop.data.title}

        } else {
            return {msg: "workshop update failed"}
        }


    } catch (err) {

        console.log("konnte nicht übergeben werden", err)
        return {msg: "workshop contact update fehlerhaft."}

    }

}


export const formatTimeToStrapiFormat = (time: string) => {

    const timeRegex = /^(\d{2}):(\d{2})$/;
    const match = time.match(timeRegex);

    if (!match) {
        throw new Error("Invalid time format, expected HH:mm");
    }

    // Extract hours and minutes
    const hours = match[1];
    const minutes = match[2];

    // Return the time in HH:mm:ss.SSS format
    return `${ hours }:${ minutes }:00.000`;
}

export const formatTimeToAdminFormat = (time: string) => {

    return time?.slice(0, 5)
};

export const createNewWorkshop = async (data: unknown, token: string) => {

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ token }`
        },
        body: JSON.stringify(data),
        next: {revalidate: 20}
    }

    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops`, config)

        if (response.ok) {
            const newWorkshop = await response.json()
            return {msg: "neuer Workshop angelegt", data: newWorkshop.data}
        } else {
            return {msg: "workshop creation failed"}
        }

    } catch (err) {

        return {msg: "failed to create workshop", err}
    }
}

export const deleteWorkshopById = async (id: string, token: string) => {

    const config = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${ token }`
        },
        next: {revalidate: 20}
    }

    try {

        const response = await fetch(`${ STRAPI_URI }/api/workshops/${ id }`, config)

        return {msg: "workshop deleted", response: response}

    } catch (err) {

        return {msg: "failed to delete workshop", err}
    }

}