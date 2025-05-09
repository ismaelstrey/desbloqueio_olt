import TituloPagina from "@/app/ui/TituloPagina";
import Voltar from "@/app/ui/Voltar";
import TicketDetalhes from "@/components/TicketDetalhes";

export default function PageTicketDetalhes({
    params,
  }: {
    params: Promise<{ id: string }>
  }){
    return (
    <>       
        <Voltar />
        <TituloPagina titulo="Atualizar status" />
        <TicketDetalhes params={params}/>
    </>
    )
}