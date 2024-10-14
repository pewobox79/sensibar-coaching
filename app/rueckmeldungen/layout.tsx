import {ReactNode, ReactElement} from "react";

import PageLayout from "@/layouts/PageLayout";

const Layout =({children}:{children: ReactNode |ReactElement |ReactElement[]})=>{

    return <PageLayout>{children}</PageLayout>

}
export default Layout