import StrapiItemsRendering from "@/layouts/StrapiItemsRendering";
import {StrapiData} from "@/types/generalTypes";

const Homepage = ({data}:{data: StrapiData}) => {

    return <>
        { data?.items?.map(item => <StrapiItemsRendering key={ item.id } { ...item }/>) }
    </>

}

export default Homepage;