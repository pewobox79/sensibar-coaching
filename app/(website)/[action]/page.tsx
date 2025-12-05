import LoginForm from "@/components/forms/LoginForm";

const ActionPage = async ({params}: { params: { action: string } }) => {
const {action} = await params;

    switch (action) {
        case "register":
            return <h3>Registration form</h3>
        default:
            return <LoginForm/>

    }
}

export default ActionPage