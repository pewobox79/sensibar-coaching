import SelbstTestResultPage from "@/pagesComponents/SelbstTestResultPage";

const Ergebnis = async ({searchParams}:{searchParams: Promise<{value: string}>})=>{

    const {value} = await searchParams;
    return <SelbstTestResultPage value={value} />
}

export default Ergebnis