import Voltar from "@/app/ui/Voltar";
import EmpresaForm from "@/components/EmpresaForm";
import EmpresaLista from "@/components/EmpresaLista";

export default function Page() {
  return <div className="flex flex-col">
    <Voltar />
    <EmpresaForm />
    <EmpresaLista/>
  </div>;
}