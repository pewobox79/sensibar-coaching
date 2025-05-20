
import Image from "next/image";
import SensibarLogo from "@/assets/images/sensibar-coaching.png"

const Homepage=()=>{


    return <Image src={SensibarLogo["src"]} alt={"senisbar logo"} width={300} height={300}/>

}

export default Homepage;