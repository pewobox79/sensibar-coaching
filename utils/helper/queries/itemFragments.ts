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
};
export const textImgGridFragment = {
    'components.text-img-grid': {
        populate: {bgColor: true, images: true, button:{
                populate: ["bgColor"]
            }},

    },
};

export const quoteSectionFragment = {
    'components.quote-section': {
        populate: {
            bgColor: true,
            image: true,
            button:{
                populate: ["bgColor"]
            }
        },
    },
};

export const gridSectionFragment = {
    'elements.grid-section': {
        populate: {
            item: {
                populate: ["link"]
            },
            bgColor: true,
        },
    },
};
