import TituloPagina from "@/app/ui/TituloPagina";
import Voltar from "@/app/ui/Voltar";
import EmpresaLista from "@/components/EmpresaLista";

export default function Page() {
  return <div className="flex flex-col">
    <Voltar />
    <TituloPagina titulo="Empresas"/>
    <EmpresaLista/>
  </div>;
}