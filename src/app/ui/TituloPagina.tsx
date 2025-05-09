'use client'
import GenerateBreadcrumbLinks from "@/components/generateBreadcrumbLinks";
import { ReactNode } from "react";

export function Titulo(titulo: string) {
  const tituloFormatado = titulo.replace(/([A-Z])/g, ' $1');
  return tituloFormatado.charAt(0).toUpperCase() + tituloFormatado.slice(1);
}

export default function TituloPagina({children,titulo}: {children?: ReactNode, titulo: string}) {
    const breakup = titulo.includes('-');



    
    if (breakup) {
      const titulos = titulo.split('-');
      return (
        <h1 className="text-3xl font-bold mb-4">
          {Titulo(titulos[0])}
          <span className="text-gray-500"> - </span>
          {Titulo(titulos[1])}
          {children}
        </h1>
      )
    }
   return (
    <h1 className="text-3xl font-bold mb-4">
      {Titulo(titulo)}  
      <br /> 
 
     <div className="flex gap-2 items-center">
     <GenerateBreadcrumbLinks />
     </div>
      {children}
    </h1>
   )
  }