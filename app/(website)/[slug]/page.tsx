import LoginForm from "@/components/forms/LoginForm";
import PageRenderComponent from "@/pagesComponents/PageRenderComponent/PageRenderComponent";
import AdventCalendar from "@/components/AdventCalendar/AdventCalendar";
const ActionPage = async ({params}: { params: { slug: string }, searchParams: { slug: string } }) => {
    const {slug} = await params;

    switch (slug) {
        case "register":
            return <h3>Registration form</h3>
        case "admin":
        case "login":
            return <LoginForm/>
        case "advent-kalender":
            return <AdventCalendar/>
        default:
            return <PageRenderComponent slug={ slug }/>

    }
}

export default ActionPage