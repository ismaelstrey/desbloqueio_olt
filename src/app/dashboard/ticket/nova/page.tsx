import TituloPagina from "@/app/ui/TituloPagina";
import Voltar from "@/app/ui/Voltar";
import NovoTicket from "@/components/NovoTicket";
export default function PageNovoTicket() {
  return <div>
          <Voltar/>
          <TituloPagina titulo="Novo Ticket" />
          <NovoTicket/>
    </div>
}