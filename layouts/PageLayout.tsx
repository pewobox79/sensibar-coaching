import {ReactElement, ReactNode} from "react";
import LegalLinkSection from "@/components/fontendEndComponents/LegalLinkSection";

const PageLayout=({children}: {children: ReactNode |ReactElement |ReactElement[]})=>{

    return <div className={"pageLayout"}>
        {children}

        <LegalLinkSection/>
    </div>

}

export default PageLayout;