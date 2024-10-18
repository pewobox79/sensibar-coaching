import type {Metadata} from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import MainLayout from "@/layouts/MainLayout";
import PageLayout from "@/layouts/PageLayout";


const tanMonCheri = localFont({
    src: [
        {
            path: '../assets/fonts/moncherifonts/tan-mon-cheri.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/moncherifonts/tan-mon-cheri.woff2',
            weight: '600',
            style: 'bold',
        },
    ],
    variable: "--font-tan-mon-cheri",
});

const TTNorms = localFont({
    src: [
        {
            path: '../assets/fonts/tt_norms/TTNorms-Regular.otf',
            weight: '400',
            style: 'lighter',
        }, {
            path: '../assets/fonts/tt_norms/TTNorms-Medium.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../assets/fonts/tt_norms/TTNorms-Bold.otf',
            weight: '900',
            style: 'bold',
        }, {
            path: '../assets/fonts/tt_norms/TTNorms-Italic.otf',
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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={ `${ tanMonCheri.variable } ${ TTNorms.variable }` }>
        <MainLayout>
            <PageLayout>
                { children }
            </PageLayout>
        </MainLayout>
        </body>
        </html>
    );
}
