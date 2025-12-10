export type QuestionKategory = "sensorische" | "soziale" | "kognitive" | "emotionale"

export type AnswerType = "false" | "true" | string

export type QuestionsType = {
    documentId: string,
    question: string,
    answer: AnswerType,
    title?: string,
    key?: string;
}[]

export type TextBlockType = { type: string, level: number, format: string, children: [] }[]
export type ImageType = {
    url: string
}

export type LinkType ={
    active: boolean
    href: string
    id: number | string
    label: string
    target: string
    titleAttribute: string,
    bgColor?: {color: string}
}

export type BgColorType = {color: string}

export interface JumbotronType {
    __component: string,
    id?: string | undefined,
    Image?: ImageType | undefined,
    image?: ImageType | undefined,
    text?: TextBlockType
}

export interface TextImageSectionType {
    __component: string,
    bgColor: BgColorType
    image: ImageType
    id: string
    link: LinkType
    text?: {
        title?: string,
        body?: TextBlockType
    }
}


export type Items = JumbotronType | TextImageSectionType

export interface StrapiData {
    items: Items[]

}