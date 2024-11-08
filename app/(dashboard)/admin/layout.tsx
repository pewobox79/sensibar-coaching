import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import '@/styles/globals.css'
import type {Metadata} from "next";
import localFont from "next/font/local";

const tanMonCheri = localFont({
    src: [
        {
            path: '../../../assets/fonts/moncherifonts/tan-mon-cheri.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../assets/fonts/moncherifonts/tan-mon-cheri.woff2',
            weight: '600',
            style: 'bold',
        },
    ],
    variable: "--font-tan-mon-cheri",
});

const TTNorms = localFont({
    src: [
        {
            path: '../../../assets/fonts/tt_norms/TTNorms-Regular.otf',
            weight: '400',
            style: 'lighter',
        }, {
            path: '../../../assets/fonts/tt_norms/TTNorms-Medium.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../../assets/fonts/tt_norms/TTNorms-Bold.otf',
            weight: '900',
            style: 'bold',
        }, {
            path: '../../../assets/fonts/tt_norms/TTNorms-Italic.otf',
            weight: '400',
            style: 'italic',
        },
    ],
    variable: "--font-tt-norms",
});
export const metadata: Metadata = {
    title: "SENSIBAR | sensibel & wunderbar",
    description: "Hochsensible Menschen bekommen bei mir hilfreiche tipps und methoden für eine bessere Lebensqualität",
};
const AdminLayout = ({children}: { children: React.ReactNode | React.ReactElement | React.ReactElement[] }) => {

    return <html>
    <body className={ `${ tanMonCheri.variable } ${ TTNorms.variable }` }>
    <DashboardLayout>
        { children }
    </DashboardLayout>
    </body>
    </html>
}

export default AdminLayout;