'use client'
import { useTicketForm } from "@/hooks/useTicketForm";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function EmpresaLista() {
    const {empresas, fetchEmpresas} = useTicketForm()

    useEffect(() => {
      fetchEmpresas();
    }, [fetchEmpresas]);
    return (
      <div className="w-full rounded-lg bg-gray-800 shadow-xl">
        <motion.table 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full min-w-full divide-y divide-gray-700">
          <thead className="bg-[#0F0F0F]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantidade de OLTs</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {empresas?.map((empresa, index) => (
              <motion.tr 
                key={empresa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, backgroundColor: "#1F1F1F" }}
                className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{empresa.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#F3F821]">{empresa.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{empresa.olts.length}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    )
}