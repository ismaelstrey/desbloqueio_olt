'use client'
import { useFetch } from "@/hooks/UseFetch";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaSpinner } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

export default function TicketLista() {
  const {fetchTickets, tickets} = useFetch();

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
 <>
    <div className="w-full rounded-lg bg-gray-800 shadow-xl">
      <motion.table 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full min-w-full divide-y divide-gray-700">
        <thead className="bg-[#0F0F0F]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Empresa</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Valor</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {tickets?.map((ticket, index) => (
            <motion.tr 
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, backgroundColor: "#1F1F1F" }}
              className="hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{ticket.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#F3F821]">{ticket.titulo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{ticket.empresa?.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center gap-2">
                <span
                  data-tooltip-id="status-tooltip"
                  data-tooltip-content={ticket.status}
                  className="inline-flex items-center">
                  {ticket.status === 'Aberto' && <FaCheckCircle className="text-green-500" />}
                  {ticket.status === 'EmAndamento' && <FaSpinner className="text-blue-500 animate-spin" />}
                  {ticket.status === 'Aberto' && <FaClock className="text-yellow-500" />}
                  <span className="ml-2">{ticket.status}</span>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">R$ {ticket.valorServico}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
    <Tooltip id="status-tooltip" />
 </>

  );
}