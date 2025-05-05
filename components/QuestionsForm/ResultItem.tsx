'use client'
import styles from "@/styles/QuestionsForm.module.css";
import {useQuestionsStore} from "@/stores/useQuestionsStore";
import {useRouter} from "next/navigation";


const ResultItem = ({diff}: { diff: number }) => {
    const router = useRouter()
    const {values} = useQuestionsStore()

    function handleSubmit() {

        let resultValue= 0;
        values.map(item=> {

            if(item.answer === "true"){
                resultValue +=1
            }
        })
        console.log("submit values", values, resultValue)

      router.push(`/selbsttest/ergebnis?value=${resultValue}`)
    }

    return <div className={ styles.nextPrevButtonsWrapper }>
        <div className={ styles.questionResultItem }>
            { diff != 0 ? <div className={ styles.questionTitle }>Du hast leider nicht alle Fragen beantwortet</div> :
                <>
                <div className={ styles.questionTitle }>
                    <h3>Schön das Du Dir die Zeit genommen hast.</h3>
                </div>

                <div className={ styles.questionTitle }>
                    Finde heraus, ob Du hochsensible bist!
                </div>

                <div className={ `${ styles.questionButton } ${ styles.resultButton }` }
                     onClick={ handleSubmit }>ERGEBNIS
                </div></>}
                </div>
        </div>
        }

        export default ResultItem