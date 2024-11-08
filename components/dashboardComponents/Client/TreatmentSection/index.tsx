'use client'
import styles from '@/styles/Client.module.css'
import TreatmentListItem from "@/components/dashboardComponents/Client/TreatmentSection/components/TreatmentListItem";
import {TreatmentNotes, useClientStore} from "@/stores/useClientStore";
import TreatmentItemDetails
    from "@/components/dashboardComponents/Client/TreatmentSection/components/TreatmentItemDetails";
import Button from "@/components/global/Button";
import {useModalOpen} from "@/stores/useModalOpen";
import NewTreatmentForm from "@/components/forms/NewTreatmentForm";


const TreatmentSection = () => {
    const clientContext = useClientStore();
    const modalContext = useModalOpen()

    const clientName = `${ clientContext.clientData?.personalData?.firstname } ${ clientContext?.clientData?.personalData?.lastname }`
    const treatmentNotes: TreatmentNotes[] | undefined = clientContext?.clientData?.treatment_notes;

    const sortedTreatmentNotes = treatmentNotes?.sort((a:{createdAt:string},b:{createdAt: string})=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const ListOfTreatments = treatmentNotes != undefined ? sortedTreatmentNotes.map((item: {
        documentId: string,
        title: string;
        createdAt: string;
        type: string;
        details: string;
    }) => {

        return <TreatmentListItem key={ item.documentId } { ...item } />
    }) : undefined;

    return <div className={ "innerWrapper" }>
        { clientContext.clientData.personalData.firstname.length > 0 &&
          <div className={ styles.treatmentOverwiewWrapper }>
            <div className={ styles.newTreatmentButton }>
              <Button type={ "submit" } title={ "neu" } action={ modalContext.setTreatmentFormOpen }/>
            </div>
            <div className={ styles.treatmentSection }>
              <div className={ styles.treatmentSplitLeft }>
                <h3>Bisherige Termine</h3>
                  { ListOfTreatments }
              </div>
                <TreatmentItemDetails/>
            </div>

              { modalContext.status.treatmentForm &&
                <NewTreatmentForm clientId={ clientContext?.clientData?.documentId as string }
                                  clientName={ clientName }/> }
          </div>
        }
    </div>
}

export default TreatmentSection