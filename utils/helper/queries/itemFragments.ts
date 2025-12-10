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
