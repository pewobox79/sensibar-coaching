import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import '@/styles/globals.css'
import type {Metadata} from "next";
import localFont from "next/font/local";
import AuthLayout from "@/layouts/AuthLayout";

const roxborough = localFont({
    src: [
        {
            path: '../../../assets/fonts/roxborough/roxborough-cf-regular.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../assets/fonts/roxborough/roxborough-cf-regular.woff',
            weight: '600',
            style: 'bold',
        },
    ],
    variable: "--font-roxborough-cf-regular",
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
    <body className={ `${ roxborough.variable } ${ TTNorms.variable }` }>
   <AuthLayout>
      <DashboardLayout>
          { children }
      </DashboardLayout>
    </AuthLayout>
    </body>
    </html>
}

export default AdminLayout;