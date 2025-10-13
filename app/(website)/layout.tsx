import type {Metadata, Viewport} from "next";
import "../../styles/globals.css";
import MainLayout from "@/layouts/MainLayout";
import PageLayout from "@/layouts/PageLayout";
import Consent from "@/components/Consent";
import { Poppins, Montserrat } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
})

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
})

export const metadata: Metadata = {
    title: "SENSIBAR | sensibel & wunderbar",
    description: "Hochsensible Menschen bekommen bei mir hilfreiche tipps und methoden für eine bessere Lebensqualität",
    icons:[{
        url: "/favicon.png"
    }],
    openGraph:{
        type: "website",
        url: "https://sensibar-coaching.de",
        title: "SENSIBAR | sensibel & wunderbar",
        description: "Hochsensible Menschen bekommen bei mir hilfreiche tipps und methoden für eine bessere Lebensqualität",
        images: [
            {
                url: "/favicon.png",
                width: 1200,
                height: 630,
                alt: "SENSIBAR | sensibel & wunderbar",
            },
        ],
        siteName: "SENSIBAR | sensibel & wunderbar",
        locale: "de_DE",
    }
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={ `${ montserrat.variable } ${ poppins.variable }` }>
        <MainLayout>
            <PageLayout>
                { children }
            </PageLayout>
        </MainLayout>
        <Consent/>
        </body>
        </html>
    );
}
