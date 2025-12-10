import {CSSProperties, ReactNode} from "react";

const Container = ({children, id, backgroundColor = "white"}: {
    id: string,
    children: ReactNode,
    backgroundColor?: CSSProperties["backgroundColor"]
}) => {


    return <div style={ {
        width: '100%',
        padding: 0,
        backgroundColor: `${ backgroundColor }`,
        color: `${ backgroundColor != "white" ? "white" : "black" }`
    } } id={ id }>
        { children }
    </div>
}

export default Container