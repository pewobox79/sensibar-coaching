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
    url: string,
    alternativeText?: string
}

export type LinkType = {
    active: boolean
    href: string
    id: number | string
    label: string
    target: 'internal' |'external' |undefined
    titleAttribute: string,
    bgColor?: { color: string }
}

export type BgColorType = { color: 'lightBeige' |'beige' | 'white' | 'darkGrey' }

export interface TextBlockType {
    __component: string
    hashId: string
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
    bgColor: BgColorType
}

export interface QuoteSectionTypes{
    __component: string,
    id: string,
    title: string
    button: LinkType
    hashId: string
    bgColor: BgColorType
    image: ImageType
    hasBgImage:boolean
}
export interface TextImageSectionType {
    __component: string
    hashId?:string
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
    link: LinkType
    image?: ImageType
    hasIcon:boolean
    border:{
        color: BgColorType
        position: "right" |"left" | "bottom" |"top" |"leftTop" |"bottomRight"
    }

}

export interface GridBundleType {
    hashId:string
    item: GridItemTypes[]
    bgColor: BgColorType
    title: string
    id: string
    __component: string
}

export interface TextImgGridTypes {
    __component: string
    id: string
    hashId:string
    button: LinkType
    leftTextBlock: TextBlock
    rightTextBlock: TextBlock
    bgColor: BgColorType
    images: ImageType[]
}


export interface ContactSectionTypes{
    __component: string
    socialLinks: LinkType[]
    legalLinks: LinkType[]
    bgColor: BgColorType
    hashId: string
    contactData: TextBlock
    id: string
}

export type Items = JumbotronType | TextImageSectionType | TextBlockType | GridBundleType | TextImgGridTypes | ContactSectionTypes |ReferenceSectionTypes

export interface StrapiData {
    items: Items[]

}


export interface ReferenceSectionTypes {
    __component: string
    bgColor: {id: string, color:BgColorType["color"] }
    title: string |undefined
    id: string
    internalName: string

}
export interface ReferencesTypes {
    data:ReferenceType[]
    bgColor: {color: BgColorType}
    title?: string |undefined
    __component: string


}

export type ReferenceType={
    documentId: string
    wer: string
    referenz: []
    color?: string
}