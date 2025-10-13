
import Image from "next/image";
import SensibarLogo from "@/assets/images/sensibar_logo_new.png"

const Homepage=()=>{


    return <Image src={SensibarLogo["src"]} alt={"senisbar logo"} width={500} height={500}/>

}

export default Homepage;