import TituloPagina from "@/app/ui/TituloPagina";
import Voltar from "@/app/ui/Voltar";
import TicketLista from "@/components/TicketLista";

export default function PageListaTickets() {
  return <div>
    <Voltar />
    <TituloPagina titulo="Lista de tickets" />
    <TicketLista />
  
  </div>;
}