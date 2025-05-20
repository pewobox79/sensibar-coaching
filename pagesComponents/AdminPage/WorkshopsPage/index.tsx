
import WorkshopsOverview from "@/components/dashboardComponents/WorkshopsOverview";

const WorkshopsPage=({workshops=[]})=>{

    return <div className={"innerWrapper"}>

        <WorkshopsOverview workshops={workshops}/>
    </div>
}

export default WorkshopsPage