'use client'
import QuestionsForm from "@/components/QuestionsForm";
import {useState} from "react";
import styles from '@/styles/QuestionsForm.module.css'
import {useQuestionsStore} from "@/stores/useQuestionsStore";
import ResultItem from "@/components/QuestionsForm/ResultItem";
import {QuestionsType} from "@/types/generalTypes";
import HeaderDescriptionBlock from "@/components/global/blocks/HeaderDescriptionBlock";
import Button from "@/components/global/Button";
const SelbstTestPage =({questionsData, intro}:{questionsData: {title: string, documentId: string}[], intro:{title: string, description: []}})=>{

    const [qNumber, setQNumber]=useState(1);
    const [startQuestions, setStartQuestions] = useState(false)

    const {values} = useQuestionsStore()

    function handleStart(){

        setStartQuestions(true)
    }
    function handleNext(){
        if(qNumber >= questionsData?.length +1 ) return

       setQNumber(prev => prev+1)
    } function handlePrev(){
        if(qNumber === 0) return
       setQNumber(prev => prev-1)
    }

    const difference = values?.length - questionsData?.length;
    return <>


    {qNumber >= questionsData?.length +1 ?<ResultItem diff={difference}/>: startQuestions ? <QuestionsForm qNumber={qNumber} questions={questionsData as QuestionsType}/>:<HeaderDescriptionBlock title={intro?.title} blocks={intro?.description}/>}

        {startQuestions ? <div className={styles.nextPrevButtonsWrapper}>
            <div onClick={handlePrev} className={`${styles.questionButton} ${qNumber === 1 ? styles.questionButtonHide:"" }`}>PREV</div>
            <h3 className={styles.questionsCounter}>{values?.length } / {questionsData?.length}</h3>
            <div onClick={handleNext} className={`${styles.questionButton} ${qNumber >= questionsData?.length +1 ? styles.displayNone:""}`}>NEXT</div>

        </div> : <Button type={"submit"} title={"Start"} action={handleStart}/>}
    </>
}

export default SelbstTestPage