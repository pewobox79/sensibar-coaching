import {ReactElement, ReactNode} from "react";

const PageLayout=({children}: {children: ReactNode |ReactElement |ReactElement[]})=>{

    return <div className={"pageLayout"}>
        {children}
    </div>

}

export default PageLayout;