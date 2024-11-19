'use client'
import DataTable from 'react-data-table-component';
import {ContactData} from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopContactOverview";

const WorkshopContactDataTable =({contacts}: { contacts:ContactData[] })=>{


    const columns = [
        {
            name: 'Vorname',
            selector: (row:ContactData )=> row?.personalData?.firstname || "",
            sortable: true,
        },
        {
            name: 'Nachname',
            selector: (row:ContactData) => row.personalData.lastname || "",
            sortable: true
        },{
            name: 'Hochsensibel',
            selector: (row:ContactData) => {

                switch(row.condition_status?.sensitiveStatus){
                    case "yes":
                        return "Ja"
                    case "unknown":
                        return "Weiß nicht"
                    case "no":
                        return "Nein"
                    default:
                        return "Unbekannt"
                }

            },
            sortable: true
        },
        {
            name: 'Geschlecht',
            selector: (row:ContactData) => {

                switch(row.personalData.gender){
                    case "male":
                        return "Mann"
                    case "female":
                        return "Frau"
                    case "diverse":
                        return "Diverse"
                    default:
                        return "Unbekannt"
                }

            },
            sortable: true
        }
    ];



        return (
            <DataTable
                data={contacts}
                columns={columns}
                pagination
            />
        );
}

export default WorkshopContactDataTable