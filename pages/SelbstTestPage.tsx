'use client'
import QuestionsForm from "@/components/QuestionsForm";
import {useState} from "react";
import styles from '@/styles/QuestionsForm.module.css'
import {useQuestionsStore} from "@/stores/useQuestionsStore";
import ResultItem from "@/components/QuestionsForm/ResultItem";
import {QuestionsType} from "@/types/generalTypes";
const SelbstTestPage =({questionsData}:{questionsData: {title: string, documentId: string}[]})=>{

    const [qNumber, setQNumber]=useState(1);

    const {values} = useQuestionsStore()

    function handleNext(){
        if(qNumber >= questionsData?.length +1 ) return

       setQNumber(prev => prev+1)
    } function handlePrev(){
        if(qNumber === 0) return
       setQNumber(prev => prev-1)
    }

    const difference = values?.length - questionsData?.length;
    return <>


    {qNumber >= questionsData?.length +1 ?<ResultItem diff={difference}/>:<QuestionsForm qNumber={qNumber} questions={questionsData as QuestionsType}/>}

        <div className={styles.nextPrevButtonsWrapper}>
            <div onClick={handlePrev} className={`${styles.questionButton} ${qNumber === 1 ? styles.questionButtonHide:"" }`}>PREV</div>
            <h3 className={styles.questionsCounter}>{values?.length } / {questionsData?.length}</h3>
            <div onClick={handleNext} className={`${styles.questionButton} ${qNumber >= questionsData?.length +1 ? styles.displayNone:""}`}>NEXT</div>

        </div>
    </>
}

export default SelbstTestPage