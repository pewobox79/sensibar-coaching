import LoginForm from "@/components/forms/LoginForm";
import AppointmentPage from "@/pagesComponents/AppointmentPage/ApppointmentPage";

const ActionPage = async ({params, searchParams}: { params: { action: string }, searchParams: { slug: string } }) => {
    const {action} = await params;
    const {slug} = await searchParams


    switch (action) {
        case "register":
            return <h3>Registration form</h3>
        case 'termin':
            return <AppointmentPage slug={ slug }/>
        default:
            return <LoginForm/>

    }
}

export default ActionPage