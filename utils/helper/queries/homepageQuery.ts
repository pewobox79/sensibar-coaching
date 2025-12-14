import qs from 'qs';
import {
    contactComponentFragment,
    gridSectionFragment,
    jumbotronFragment, quoteSectionFragment,
    textBlockFragment,
    textImgFragment, textImgGridFragment
} from "@/utils/helper/queries/itemFragments";

export const homepageQuery = qs.stringify({
    populate: {
        items: {
            on: {
                ...jumbotronFragment,
                ...textImgFragment,
                ...textBlockFragment,
                ...gridSectionFragment,
                ...quoteSectionFragment,
                ...textImgGridFragment,
                ...contactComponentFragment
            },
        },
    },
}, {
    encodeValuesOnly: true,
});
