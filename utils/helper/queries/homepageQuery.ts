import qs from 'qs';
import {jumbotronFragment, textImgFragment} from "@/utils/helper/queries/itemFragments";

export const homepageQuery = qs.stringify({
    populate: {
        items: {
            on: {
                ...jumbotronFragment,
                ...textImgFragment
            },
        },
    },
}, {
    encodeValuesOnly: true,
});
