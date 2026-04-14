import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalLinkSection from "@/components/fontendEndComponents/LegalLinkSection";


const MainLayout = ({children}: { children: React.ReactNode | React.ReactElement |React.ReactElement[] }) => {

    return <>

        <Header/>
        <main className={"mainContent"}>
            { children }
        </main>
        <LegalLinkSection/>
        <Footer/>
    </>
}

export default MainLayout;