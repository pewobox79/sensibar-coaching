import QuestionsItem from "@/components/QuestionsForm/QuestionsItem";
import { QuestionsType} from "@/types/generalTypes";



const QuestionsForm = ({questions, qNumber}:{questions:QuestionsType, qNumber: number}) => {
    const ListOfQuestions = questions?.map((question, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return <QuestionsItem key={ question.documentId } { ...question } qNumber={ qNumber } index={ index }/>
    })

    if (qNumber > questions?.length) return <div>no questions left</div>

    return <>{ ListOfQuestions }</>
}

export default QuestionsForm