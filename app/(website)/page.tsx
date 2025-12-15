import Homepage from "@/pagesComponents/Homepage";
import {getHomepage} from "@/lib/strapi/generalHelper";
import Container from "@/components/global/Container";


export default async function Home() {

  const isMaintenance = false
  if(isMaintenance) return <Container id={"kajd"}><div style={{height: '100vh', display: "flex", justifyContent: "center", alignItems: "center", color: 'black'}}><h3>Seite befindet sich im Umbau</h3></div></Container>
  const homepageData = await getHomepage()
  return (
     <Homepage data={homepageData?.data}/>
  );
}
