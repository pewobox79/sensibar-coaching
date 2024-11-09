import {Toast} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from '@fortawesome/free-solid-svg-icons'
import {Dispatch, SetStateAction} from "react";

const ToastMessage = ({state, setState}: {
    state: { msg: string, state: boolean, type: string },
    setState: Dispatch<SetStateAction<{ state: boolean; msg: string; type: string; }>>
}) => {

    function handleClose() {

        setState((prevState) => ({...prevState, state: false}))

    }

    let variant

    switch (state?.type) {
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
        show={ state.state }
        onClose={ () => {
            handleClose()
        } }
        delay={ 2000 }
        autohide
        className="d-inline-block m-1"
        style={ {
            position: "absolute",
            display: "fixed",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            top: 0,
            left: 0,
            backgroundColor: variant,
            width: "100%",
            minHeight: 30,
            height: "auto",
            textAlign: "center",
            margin: "auto",
            padding: "5px 0"
        } }
    >

        <FontAwesomeIcon icon={ faClose } style={ {width: 30, height: 30, color: "white"} } onClick={ handleClose }/>

        <Toast.Body>
            <h4 style={ {color: "white"} }> { state.msg }</h4>

        </Toast.Body>
    </Toast>
}

export default ToastMessage;