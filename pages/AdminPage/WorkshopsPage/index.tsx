'use client'
import WorkshopsOverview from "@/components/dashboardComponents/WorkshopsOverview";

const WorkshopsPage=({workshops=[]})=>{

    console.log("list of workshops", workshops)
    return <div className={"innerWrapper"}>

        <WorkshopsOverview workshops={workshops}/>
    </div>
}

export default WorkshopsPage