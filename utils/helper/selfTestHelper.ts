import {QuestionKategory} from "@/types/generalTypes";

const doesValues ={

    emotionale: "E=Emotional Reactivity & Empathy ",
    sensorische: "S=Sensing the Subtle",
    soziale: 'O=Overstimulation',
    kognitive: 'D=deep of Processing'
}

export const getDoesValuesByCategory = (kategory:QuestionKategory)=>{

    return doesValues[kategory]

}

export const calculateResultPoints =()=>{


}