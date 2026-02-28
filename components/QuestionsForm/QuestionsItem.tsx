import styles from '@/styles/QuestionsForm.module.css'
import {useQuestionsStore} from "@/stores/useQuestionsStore";
import {useState} from "react";
import {AnswerType} from "@/types/generalTypes";

const QuestionsItem = ({title, kategory, documentId, qNumber, index}: {
    title: string,
    qNumber: number,
    kategory: string,
    documentId: string,
    index: number,
}) => {
    const {addItem, updateItem} = useQuestionsStore();
    const [number, setNumber] = useState(0)
    const [answer, setAnswer] = useState<{question: string, answer:AnswerType, documentId: string, kategory:string}>({
        question: "",
        answer: "",
        kategory:"",
        documentId: documentId
    })

    function handleChange(e: { target: { name: string, checked: boolean, value: AnswerType } }) {
        setAnswer({...answer, question: e.target.name, answer: e.target.value, kategory})
        if (number === 0) {
            addItem(answer)
            setNumber(1)
        }
        updateItem(documentId, {answer: e.target.value, question: e.target.name, kategory})


    }


    const myStyle = qNumber === index + 1 ? styles.questionItemWrapper : styles.displayNone


    return <div className={ myStyle }>
        <div className={ styles.questionTitle }>
            <h3>{ title }</h3>

        </div>
        <div className={ styles.questionInputField }>
            <div className={ styles.questionInputElement }>

                <input id={ title+"1" } type={ "radio" } value="true" checked={ answer.answer === "true" } name={ title }
                       onChange={ handleChange } data-kategory={kategory}/>
                <label htmlFor={ title+"1" }>Ja</label>
            </div>

            <div className={ styles.questionInputElement }>

                <input id={ title+"2" } type={ "radio" } name={title} value="false" checked={ answer.answer === "false" }
                       onChange={ handleChange }/>
                <label htmlFor={ title +"2"}>Nein</label>
            </div>
        </div>


    </div>
}


export default QuestionsItem