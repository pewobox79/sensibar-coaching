'use client'

import dynamic from 'next/dynamic';
import {StrapiPaymentProps} from "@/types/generalTypes";

const WorkshopButtons = dynamic(
  () => import('@/lib/pdfCreator/templates/workshop/WorkshopButtons'),
  { ssr: false }
);

export default function TicketDocumentsPage(props:StrapiPaymentProps) {
  if (!props) return <div>Rechnung und Ticket sind nicht bekannt</div>;

  return (
    <>
      <h1>Ticket Documents</h1>
      <WorkshopButtons {...props} />
    </>
  );
}