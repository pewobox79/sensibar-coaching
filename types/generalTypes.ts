export type QuestionKategory = "sensorische" | "soziale" | "kognitive" | "emotionale"

export type AnswerType = "false" | "true" | string

export type QuestionsType = {
    documentId: string,
    question: string,
    answer: AnswerType,
    title?: string,
    key?: string;
}[]

export type TextBlock = { type: string, level: number, format: string, children: [] }[]
export type ImageType = {
    url: string
}

export type LinkType = {
    active: boolean
    href: string
    id: number | string
    label: string
    target: string
    titleAttribute: string,
    bgColor?: { color: string }
}

export type BgColorType = { color: string }

export interface TextBlockType {
    __component: string
    bgColor: BgColorType
    body: TextBlock
    id: string
    title?: string
}

export interface JumbotronType {
    __component: string,
    id?: string | undefined
    Image?: ImageType | undefined
    image?: ImageType | undefined
    text?: TextBlock
}

export interface TextImageSectionType {
    __component: string
    textLeft: boolean
    bgColor: BgColorType
    image: ImageType
    id: string
    link: LinkType
    text?: {
        title?: string
        body?: TextBlock
    }
}

export interface GridItemTypes {
    title: string
    description: TextBlock
    active: boolean
    id: string
}

export interface GridBundleType {
    item: GridItemTypes[]
    bgColor: BgColorType
    title: string
    id: string
    __component: string
}

export type Items = JumbotronType | TextImageSectionType | TextBlockType | GridBundleType

export interface StrapiData {
    items: Items[]

}