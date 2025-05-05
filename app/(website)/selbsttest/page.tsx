import SelbstTestPage from "@/pages/SelbstTestPage";
import {getTestQuestions} from "@/lib/strapi/generalHelper";

const SelbstTest = async ()=>{

    const questions = await getTestQuestions();

    return <SelbstTestPage questionsData={questions?.data ? questions?.data : []}/>
}

export default SelbstTest