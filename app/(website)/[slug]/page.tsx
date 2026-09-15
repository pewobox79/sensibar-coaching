import LoginForm from "@/components/forms/LoginForm";
import PageRenderComponent from "@/pagesComponents/PageRenderComponent/PageRenderComponent";
import AdventCalendar from "@/components/AdventCalendar/AdventCalendar";
import AdventCalendarRecall from "@/components/AdventCalendar/AdventCalenderRecall";
import React from "react";
const ActionPage = async ({params}: { params: { slug: string }, searchParams: { slug: string } }) => {
    const {slug} = await params;

    let renderedComponent: React.ReactNode;
    switch (slug) {
        case "register":
            renderedComponent = <h3>Registration form</h3>
            break;
        case "admin":
        case "login":
            renderedComponent = <LoginForm/>
            break;
        case "advent-kalender":
            renderedComponent = <AdventCalendar/>
            break;
        case "advent-kalender-rueckruf":
            renderedComponent = <AdventCalendarRecall/>
            break;
        default:
            renderedComponent = <PageRenderComponent slug={ slug }/>

    }


    return <div className={"pageLayout"}>{renderedComponent}</div>
}

export default ActionPage