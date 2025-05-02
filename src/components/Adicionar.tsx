'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuTicketPlus } from "react-icons/lu";
import { PiListPlusFill } from "react-icons/pi";
import { TbBuildingPlus } from "react-icons/tb";

export default function Adicionar() {
    const [show, setShow] = useState(false)
return <div className="fixed top-8 left-8">
    <FaPlus onClick={()=>setShow(!show)} title="Adicionar" size={40} className="hover:scale-125 scale-3d cursor-pointer transition-all" />
  {show &&   <motion.div 
     initial={{ opacity: 0, x: -20 }}
     animate={{ opacity: 1, x: 0 }}
  >    <ul className="flex ml-5 mt-10 flex-col gap-8">
            <li><Link href="/os/novo-ticket"><LuTicketPlus size={40} className="hover:scale-125 scale-3d cursor-pointer transition-all"/></Link></li>
            <li><Link href="/os/novo-ticket"><PiListPlusFill size={40} className="hover:scale-125 scale-3d cursor-pointer transition-all"/></Link></li>
            <li><Link href="/os/empresa/nova"><TbBuildingPlus size={40} className="hover:scale-125 scale-3d cursor-pointer transition-all"/></Link></li>
        </ul></motion.div>
  
}
</div>;
}