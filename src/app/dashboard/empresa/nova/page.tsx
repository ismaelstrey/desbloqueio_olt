import TituloPagina from "@/app/ui/TituloPagina";
import Voltar from "@/app/ui/Voltar";
import EmpresaForm from "@/components/EmpresaForm";

export default function Page() {
  return <div className="flex flex-col">
       <Voltar />
       <TituloPagina titulo="Adicionar empresa"/>
    <EmpresaForm />
  </div>;
}