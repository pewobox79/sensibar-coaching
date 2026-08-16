'use client'

import { JSX } from "react/jsx-runtime";
import { ReactNode } from "react";
import styles from '@/styles/Event.module.css'
import Link from "next/link";
import { TextBlock } from "@/types/generalTypes";
import { formatVowel } from "@/utils/helper/strapiHelper";

type RichTextChild = {
    text?: string
    type: string
    url?: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    children?: RichTextChild[]
}

type RichTextBlock = {
    type: string
    children: RichTextChild[]
    level?: number
    format?: string
}

const RichTextRenderer = ({ blocks, textColor }: { blocks: TextBlock, textColor?: string }) => {
    const renderInlineChildren = (children?: RichTextChild[]) => {
        return children?.map((child, index) => {
            const key = `${child.text || child.type}-${index}`

            if (child.type === "link") {
                return (
                    <Link className="innerTextLinkStyle" href={child.url || "#"} key={key}>
                        {renderInlineChildren(child.children)}
                    </Link>
                )
            }

            let content: ReactNode = formatVowel(child.text || "")

            if (child.bold) {
                content = <strong>{content}</strong>
            }

            if (child.italic) {
                content = <em>{content}</em>
            }

            if (child.underline) {
                content = <u>{content}</u>
            }

            if (child.strikethrough) {
                content = <s>{content}</s>
            }

            return <span key={key}>{content}</span>
        })
    }

    const renderChildren = (block: RichTextBlock) => {
        const mainType = block?.type
        const listFormat = block?.format;

        switch (mainType) {
            case 'paragraph':
                if (!block.children?.length) {
                    return null
                }

                if (
                    block.children.length === 1 &&
                    block.children[0]?.type === "text" &&
                    block.children[0]?.text?.length === 0
                ) {
                    return <div key="empty-paragraph" style={{ padding: "10px 0" }}></div>
                }

                return (
                    <p className={styles.singleEventDescriptionParagraph}>
                        {renderInlineChildren(block.children)}
                    </p>
                );

            case "heading": {
                const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;

                return (
                    <div style={{ padding: "10px 0" }}>
                        <HeadingTag>{renderInlineChildren(block.children)}</HeadingTag>
                    </div>
                );
            }

            case "list": {
                const ListTag = listFormat === "ordered" ? "ol" : "ul";

                return (
                    <ListTag className={listFormat === "unordered" ? styles.singleEventContentListWrapper : undefined}>
                        {block.children?.map((listItem, index) => (
                            <li
                                key={`list-item-${index}`}
                                className={listFormat === "unordered" ? styles.singleEventListItem : undefined}
                            >
                                {renderInlineChildren(listItem.children)}
                            </li>
                        ))}
                    </ListTag>
                );
            }

            default:
                return null;
        }
    };

    const RenderedComponents = blocks?.map((block, index) => {
        return (
            <div key={`block-${index}`} style={{ color: textColor || '#333' }}>
                {renderChildren(block as RichTextBlock)}
            </div>
        )
    })

    return (
        <div className={styles.contentInner}>
            {RenderedComponents}
        </div>
    );
};

export default RichTextRenderer