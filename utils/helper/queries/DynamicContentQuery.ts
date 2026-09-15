import qs from 'qs';
import {
    adventCalendarFragment,
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


export const AdventCalendarQuery = qs.stringify({
    populate: {
        items: {
                ...adventCalendarFragment,
        },
    },
}, {
    encodeValuesOnly: true,
});



export const QuestionContentQuery = qs.stringify({
    populate:true
})



