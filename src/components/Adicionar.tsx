'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { LuTicketPlus } from "react-icons/lu";
import { PiListPlusFill } from "react-icons/pi";
import { TbBuildingPlus } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { getSession, signOut } from "next-auth/react";
import { UserProps } from "@/@types";

export default function Adicionar() {
    const [show, setShow] = useState(false)
    const [usuario, setUsuario] = useState<UserProps>()
    const usuarioLogado = async () =>{
      const user = await getSession()
      setUsuario(user?.user as UserProps)
     
    }
useEffect(()=>{
    usuarioLogado()
},[])

return <div className="fixed h-full top-8 left-8">
   <div className="flex flex-col h-full ">
   <IoIosArrowForward onClick={()=>setShow(!show)} title={`${show ? 'Esconder menu':'Mostrar menu'}`} size={40} className={`hover:scale-125 scale-3d cursor-pointer transition-all ${show && 'rotate-180 text-accent'}`} />
  {show && <div className="flex h-full flex-col content-between items-center justify-around">
    <motion.div 
     initial={{ opacity: 0, x: -20 }}
     animate={{ opacity: 1, x: 0 }}
  >    <ul className="flex ml-5 mt-10 flex-col gap-8 h-full">
            <li><Link className="flex group gap-4 justify-left items-center" href="/os"><FaHome title="Home" size={40} className="hover:scale-125 scale-3d cursor-pointer transition-all"/><span className="opacity-0 transition-all group-hover:opacity-90">Home</span></Link></li>
            <li><Link className="flex group gap-4 justify-left items-center" href="/os/novo-ticket"><LuTicketPlus title="Adicionar ticket" size={40} className="hover:scale-125 scale-3d cursor-pointer transition-all"/> <span  className="opacity-0 transition-all group-hover:opacity-90">Novo Ticket</span></Link></li>
            <li><Link className="flex group gap-4 justify-left items-center" href="/os/olt/nova"><PiListPlusFill title="Home" size={40} className="hover:scale-125 scale-3d cursor-pointer transition-all"/> <span  className="opacity-0 transition-all group-hover:opacity-90">Nova OLT</span></Link></li>
            <li><Link className="flex group gap-4 justify-left items-center" href="/os/empresa/nova"><TbBuildingPlus title="Adicionar empresa" size={40} className="hover:scale-125 scale-3d cursor-pointer transition-all"/> <span  className="opacity-0 transition-all group-hover:opacity-90">Nova Empresa</span></Link></li>
        </ul>
        </motion.div>

         <motion.div 
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }} 
         className="flex justify-around ml-5 flex-col gap-8 h-full"
         > 
       
            <div onClick={() => signOut()} className="flex flex-col justify-center items-center content-center text-amber-200 hover:text-red-500">
                <span><IoExit title="Sair" size={40} className="hover:scale-125 scale-3d cursor-pointer transition-all"/></span>
                <span>{usuario?.name}</span> 
             </div>
        </motion.div>
  </div>
  
}
   </div>
</div>;
}