export type QuestionKategory = "sensorische" |"soziale" | "kognitive" |"emotionale"

export type AnswerType = "false" |"true"|string

export type QuestionsType = {
    documentId: string,
    question: string,
    answer: AnswerType,
    title?: string,
    key?: string;
}[]
