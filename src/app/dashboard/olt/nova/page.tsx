import TituloPagina from "@/app/ui/TituloPagina";
import Voltar from "@/app/ui/Voltar";
import OltForm from "@/components/OltForm";

export default function Page() {
  return <div>
    <Voltar />
    <TituloPagina titulo="Nova OLT" />
    <OltForm />
  </div>;
}