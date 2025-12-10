import Homepage from "@/pagesComponents/Homepage";
import {getHomepage} from "@/lib/strapi/generalHelper";


export default async function Home() {

  const homepageData = await getHomepage()
  console.log("homepagedata", homepageData)
  return (
     <Homepage data={homepageData.data}/>
  );
}
