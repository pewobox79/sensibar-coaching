import SelbstTestPage from "@/pages/SelbstTestPage";
import {getQuestionsPageIntro, getTestQuestions} from "@/lib/strapi/generalHelper";

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {

    // Fetch data based on slug (can be from CMS, DB, etc.)
    const data = await getQuestionsPageIntro();
    return {
        title:  `SENSIBAR | ${data?.data.seoData?.metaTitle}`,
        description: data?.data.seoData?.metaDescription,
        openGraph: {
            title: data?.data.seoData?.metaTitle,
            description: data?.data.seoData?.metaDescription,
        },
    }
}
const SelbstTest = async ()=>{


    const questions = await getTestQuestions();
    const introContent = await getQuestionsPageIntro();
    console.log("selbsttest intro", introContent)



    return <SelbstTestPage questionsData={questions?.data ? questions?.data : []} intro={introContent.data}/>
}

export default SelbstTest