'use client'
import DataTable, {TableStyles} from 'react-data-table-component';
import {ContactData} from "@/components/dashboardComponents/WorkshopsOverview/components/WorkshopContactOverview";

const WorkshopContactDataTable =({contacts}: { contacts:ContactData[] })=>{

    const customStyles:TableStyles = {
        headCells: {
            style: {
                backgroundColor: "rgba(240, 223, 211, 1)", // Light gray background
                color: "rgba(51, 51, 51, 1)", // Dark text
                fontWeight: "bold",
                textTransform: "uppercase", // Make text uppercase
                borderBottom: "1px solid rgba(51, 51, 51, 1)", // Add a border below the header
            },
        },
        headRow: {
            style: {
                backgroundColor: "rgba(51, 51, 51, 1)", // Different background for the entire header row
            },
        },
    };

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
                customStyles={customStyles}
            />
        );
}

export default WorkshopContactDataTable