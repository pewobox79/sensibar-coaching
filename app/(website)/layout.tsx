import type {Metadata, Viewport} from "next";
import localFont from "next/font/local";
import "../../styles/globals.css";
import MainLayout from "@/layouts/MainLayout";
import PageLayout from "@/layouts/PageLayout";
import Consent from "@/components/Consent";
import { Poppins, Montserrat } from 'next/font/google'


/*const roxborough = localFont({
    src: [
        {
            path: '../../assets/fonts/roxborough/roxborough-cf-regular.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/roxborough/roxborough-cf-regular.woff',
            weight: '600',
            style: 'bold',
        },
    ],
    variable: "--font-roxborough-cf-regular",
});

const TTNorms = localFont({
    src: [
        {
            path: '../../assets/fonts/tt_norms/TTNorms-Regular.otf',
            weight: '400',
            style: 'lighter',
        }, {
            path: '../../assets/fonts/tt_norms/TTNorms-Medium.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/tt_norms/TTNorms-Bold.otf',
            weight: '900',
            style: 'bold',
        }, {
            path: '../../assets/fonts/tt_norms/TTNorms-Italic.otf',
            weight: '400',
            style: 'italic',
        },
    ],
        variable: "--font-tt-norms",
});*/

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'], // nur die benötigten Gewichtungen importieren
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
