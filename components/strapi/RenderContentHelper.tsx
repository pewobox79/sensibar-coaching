'use client'
import {JSX} from "react/jsx-runtime";


const RichTextRenderer = ({ blocks }:{blocks:[]}) => {
//@-ts-ignoe

    const renderChildren = (children:{type: string, children: [], level: number}) => {

        const mainType = children?.type
        return children?.children?.map((child:{text: string}, index) => {


            switch (mainType) {
                case 'paragraph':

                    if(child.text.length === 0){

                        return <div style={{padding: "10px 0"}}></div>
                    }else {
                        return <p key={ index }>{ child.text }</p>;
                    }
                case "heading":
                        const HeadingTag = `h${children.level}` as keyof JSX.IntrinsicElements ;
                        return <div style={{padding: "10px 0"}}><HeadingTag>{child.text}</HeadingTag></div>;
                default:
                    return null; // Return nothing for unrecognized types
            }
        });
    };
    return (
        <>
            {blocks?.map((block, index) => (
                <div key={index}>
                    {renderChildren(block)}
                </div>
            ))}
        </>
    );
};
export default RichTextRenderer