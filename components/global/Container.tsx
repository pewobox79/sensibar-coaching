import {CSSProperties, ReactNode} from "react";

const Container = ({children, id, backgroundColor = "white"}: {
    id: string,
    children: ReactNode,
    backgroundColor?: CSSProperties["backgroundColor"]
}) => {
    return <div className={"sectionContainer"} style={ {
        backgroundColor: `${ backgroundColor }`,
        color: `${ backgroundColor != "#fff" ? "white" : "rgba(23, 23, 23, 1)" }`
    } } id={ id }>
        { children }

    </div>
}

export default Container