'use client'
import { useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";
export default function Voltar() {
    const router = useRouter();
  return <TbArrowBackUp title="Voltar" className="fixed top-8 right-8 text-accent cursor-pointer" size={40} onClick={()=>router.back()} />;
}