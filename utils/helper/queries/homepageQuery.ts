import qs from 'qs';
import {
    gridSectionFragment,
    jumbotronFragment,
    textBlockFragment,
    textImgFragment
} from "@/utils/helper/queries/itemFragments";

export const homepageQuery = qs.stringify({
    populate: {
        items: {
            on: {
                ...jumbotronFragment,
                ...textImgFragment,
                ...textBlockFragment,
                ...gridSectionFragment
            },
        },
    },
}, {
    encodeValuesOnly: true,
});
