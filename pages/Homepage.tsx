
import {connectMongoDB} from "@/utils/db/mongodb";
import Image from "next/image";
import SensibarLogo from "@/assets/images/sensibar-coaching.png"

const Homepage=()=>{
connectMongoDB().then(data => console.log(data))

    return <Image src={SensibarLogo["src"]} alt={"senisbar logo"} width={300} height={300}/>

}

export default Homepage;