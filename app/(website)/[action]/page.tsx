import LoginForm from "@/components/forms/LoginForm";

const ActionPage = ({params}: { params: { action: string } }) => {


    switch (params.action) {
        case "register":
            return <h3>Registration form</h3>
        default:
            return <LoginForm/>

    }
}

export default ActionPage