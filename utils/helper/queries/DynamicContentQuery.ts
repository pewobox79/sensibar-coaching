import qs from 'qs';
import {
    contactComponentFragment,
    gridSectionFragment,
    jumbotronFragment, logoSection, quoteSectionFragment, referencesFragment,
    textBlockFragment,
    textImgFragment, textImgGridFragment
} from "@/utils/helper/queries/itemFragments";

export const DynamicContentQuery = qs.stringify({
    populate: {
        items: {
            on: {
                ...jumbotronFragment,
                ...textImgFragment,
                ...textBlockFragment,
                ...gridSectionFragment,
                ...quoteSectionFragment,
                ...textImgGridFragment,
                ...contactComponentFragment,
                ...referencesFragment,
                ...logoSection
            },
        },
    },
}, {
    encodeValuesOnly: true,
});



export const QuestionContentQuery = qs.stringify({
    populate:true
})

