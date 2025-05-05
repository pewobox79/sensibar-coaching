import SelbstTestResultPage from "@/pages/SelbstTestResultPage";

const Ergebnis = async ({searchParams}:{searchParams: Promise<{value: string}>})=>{

    const {value} = await searchParams;
    console.log("value", value)
    return <SelbstTestResultPage value={value} />
}

export default Ergebnis