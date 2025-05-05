import {create} from "zustand";
import {AnswerType, QuestionsType} from "@/types/generalTypes";

interface QuestionStore {
    values: QuestionsType,
    addItem: (answer:{documentId: string, answer: AnswerType, question: string}) => void,
    updateItem:(documentId: string, updatedField: {answer: AnswerType})=>void
}

export const useQuestionsStore = create<QuestionStore>((set) => ({
    values: [],
    addItem: (answer:{documentId: string, answer: AnswerType, question: string}) =>
        set((state:QuestionStore) => ({
            values: [...state.values, answer],
        })),

    updateItem: (documentId:string, updatedFields) =>
        set((state) => ({
            values: state.values.map((item) =>
                item.documentId === documentId
                    ? { ...item, ...updatedFields }
                    : item
            ),
        })),
}));