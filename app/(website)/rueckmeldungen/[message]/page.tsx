import WorkshopSubmissions from "@/pagesComponents/MessagePages/WorkshopSubmissions";
import DoubleOptInPage from "@/pagesComponents/MessagePages/DoubleOptInPage";

const DynamicMessagePage =({params}: {params: { message: string }})=>{

    switch (params.message) {
        case "workshopSubmission":
            return <WorkshopSubmissions/>
        case "doubleOptIn":
            return <DoubleOptInPage/>
        default:
            return <h1>This is a default message.</h1>  // Replace with a more specific message based on the input parameter.  // For example, return <h1>Error: {params.message}</h1> for more detailed error messages.  // Or use a switch statement to handle different message types.  // This example is just a placeholder and should be replaced with the appropriate logic.  // You can also use a routing library like react-router-dom to handle dynamic routing and display different pages based on the input parameter.  // For example, <Route path="/message/:message" component={DynamicMessagePage} /> and <DynamicMessagePage message={params.message}/> in App.tsx
    }

}

export default DynamicMessagePage