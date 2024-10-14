import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const MainLayout = ({children}: { children: React.ReactNode | React.ReactElement |React.ReactElement[] }) => {

    return <>

        <Header/>
        <main className={"mainContent"}>
            { children }
        </main>
        <Footer/>
    </>
}

export default MainLayout;