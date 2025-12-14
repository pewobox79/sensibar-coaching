import qs from 'qs';
import {
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
                ...textImgGridFragment
            },
        },
    },
}, {
    encodeValuesOnly: true,
});
