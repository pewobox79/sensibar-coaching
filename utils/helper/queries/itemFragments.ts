export const jumbotronFragment = {
    'elements.jumbotron': {
        populate: ['Image'],
    }
}

export const textImgFragment = {
    'components.text-img-component': {
        populate: {
            bgColor: true,
            text: true,
            image: true,
            link: {
                populate: ['bgColor'],
            },
        },
    },
};
export const textBlockFragment = {
    'elements.text-block': {
        populate: ['bgColor'],
    },
};export const gridSectionFragment = {
    'elements.grid-section': {
        populate: ['item', 'bgColor'],
    },
};
