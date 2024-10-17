import type {Metadata} from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import MainLayout from "@/layouts/MainLayout";
import PageLayout from "@/layouts/PageLayout";

const tanMonCheri = localFont({
    src: "../assets/fonts/moncherifonts/tan-mon-cheri.woff",
    variable: "--font-tan-mon-cheri",
    weight: "100 900",
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
        <body className={ `${ tanMonCheri.variable }` }>
        <MainLayout>
            <PageLayout>
                { children }
            </PageLayout>
        </MainLayout>
        </body>
        </html>
    );
}
