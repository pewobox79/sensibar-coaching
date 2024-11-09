'use client'
import {JSX} from "react/jsx-runtime";
import styles from '@/styles/Event.module.css'
import Link from "next/link";

const RichTextRenderer = ({blocks}: { blocks: [] }) => {

//@-ts-ignoe
    const renderChildren = (children: { type: string, children: [], level: number, format: string }) => {

        const mainType = children?.type
        const listFormat = children?.format;


        return children?.children?.map((child: {
            text: string,
            type: string,
            url: string,
            children: [{ text: string }]
        }, index) => {
            const individualKeyExtension = Math.random() * 100

            switch (mainType) {
                case 'paragraph':
                    if (child.type === "text") {

                        if (child?.text?.length === 0) {

                            return <div key={ index * individualKeyExtension } style={ {padding: "10px 0"} }></div>
                        } else {
                            return <p key={ index + individualKeyExtension }
                                      className={ styles.singleEventDescriptionParagraph }>{ child.text }</p>;
                        }
                    } else if (child?.type === "link") {
                        return child?.children?.map((item) => {

                            return <Link className={ "innerTextLinkStyle" } href={ `${child.url}` }
                                         key={ item.text + individualKeyExtension }>{ item.text }</Link>

                        })

                    }
                    break;
                case "heading":
                    const HeadingTag = `h${ children.level }` as keyof JSX.IntrinsicElements;
                    return <div key={ index + individualKeyExtension } style={ {padding: "10px 0"} }>
                        <HeadingTag>{ child.text }</HeadingTag></div>;
                case "list":
                    if (listFormat === "unordered") {

                        return <ul key={ index + individualKeyExtension }
                                   className={ styles.singleEventContentListWrapper }>{ child.children?.map((item, index) => (
                            <li key={ index + individualKeyExtension }
                                className={ styles.singleEventListItem }>{ item.text }</li>
                        )) }</ul>;
                    } else {
                        return <ol key={ index + individualKeyExtension }>{ child.children?.map((item, index) => (
                            <li key={ index + individualKeyExtension }>{ item.text }</li>
                        )) }</ol>;
                    }
                default:
                    return null; // Return nothing for unrecognized types
            }
        });
    };

    const RenderedComponents = blocks?.map((block) => {
        const indiKeyIndex = Math.random() * 90
        return <div key={ indiKeyIndex } >
            { renderChildren(block) }
        </div>
    })
    return (
        <>
            { RenderedComponents }
        </>
    );
};
export default RichTextRenderer