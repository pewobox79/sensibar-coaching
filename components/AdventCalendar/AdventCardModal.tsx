const AdventCardModal = ({modal, handleModal}:{modal: boolean, handleModal: () => void}) => {


    return <div className={`adventCardModal ${modal ? "adventCardModalOpen" : ""}`}>
        <div onClick={handleModal}>Schließen</div>
        <div>
            <iframe width="auto" height="auto" src="https://www.youtube.com/embed/coHjNndUh04?si=MTKca_Bbjh1cpXX5"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
        </div>

    </div>
}

export default AdventCardModal