'use client'
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
export default function Novo() {
const [slug, setSlug] = useState<string>();
  const patch = usePathname();
  const page = patch.split('/')[2];
  const tamanho = patch.split('/').length


  
  useEffect(() => {
   setSlug(page);
  }, [patch,slug]); 

  
    const router = useRouter();
    if (tamanho !== 3) {
      return
    }

    return <FaPlusCircle title="Voltar" className="fixed hover:scale-125 transition-all bottom-10 right-8 text-accent cursor-pointer" size={40} onClick={()=>router.push(`${slug}/nova`)} />;
 



}