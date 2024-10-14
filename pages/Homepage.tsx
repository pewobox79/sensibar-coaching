
import {connectMongoDB} from "@/utils/db/mongodb";

const Homepage=()=>{
connectMongoDB().then(data => console.log(data))

    return <>
        <h1>Sansibar</h1>
        <p>Sensibel & Wunderbar</p>
    </>
}

export default Homepage;