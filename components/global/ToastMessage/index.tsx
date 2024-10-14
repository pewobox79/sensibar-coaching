import {Toast} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faClose } from '@fortawesome/free-solid-svg-icons'

const ToastMessage = ({state, setState}) => {

function handleClose() {
    setState({...state, state: false})

    }
    let variant

    switch (state.type) {
        case 'error':
            variant = 'red'
            break;
        case 'success':
            variant = 'green'
            break;
        default:
            variant = 'info'
    }

    return <Toast
        show={state.state}
        className="d-inline-block m-1"
        style={{backgroundColor: variant, width:"70%", borderRadius: 10, minHeight: 30, height: "auto", textAlign: "center", margin: "auto"}}
    >

            <FontAwesomeIcon icon={faClose} style={{width: 30, height:30,color: "white"}} onClick={handleClose}/>

        <Toast.Body>
            <h4 style={{color: "white"}}> { state.msg }</h4>

        </Toast.Body>
    </Toast>
}

export default ToastMessage;