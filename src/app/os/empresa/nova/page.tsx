import Voltar from "@/app/ui/Voltar";
import EmpresaForm from "@/components/EmpresaForm";

export default function Page() {
  return <div className="flex flex-col">
    <Voltar />
    <EmpresaForm />
  </div>;
}