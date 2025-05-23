'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaTicketAlt, FaCheckCircle, FaHourglassHalf, FaExclamationCircle } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import TituloPagina from '../ui/TituloPagina'
interface Ticket {
  id: number
  titulo: string
  status: "Aberto" | "EmAndamento" | "Finalizado" | "Cancelado"
  tipoServico: string
  statusPagamento: "Pendente"|"Pago"|"Cancelado"
  empresa: {
    nome: string
  }
  dataSolicitacao: string
  valorServico: number
}

export default function Dashboard() {

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState('todos')

  const route = useRouter()
  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/tickets' + (filtroStatus !== 'todos' ? `?status=${filtroStatus}` : ''))
      const data = await response.json()

     
      if(data.error){
        toast.error(data.error)
        route.push('/os/empresa/nova')
        return
      }
      setTickets(data)
    } catch (error) {
      console.error('Erro ao carregar tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    
 
    fetchTickets()
  },[filtroStatus])
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Finalizado':
        return <FaCheckCircle className="text-green-500" />
      case 'EmAndamento':
        return <FaHourglassHalf className="text-yellow-500" />
      case 'Aberto':
        return <FaExclamationCircle className="text-red-500" />
      default:
        return <FaTicketAlt className="text-gray-500" />
    }
  }

  const getMetricas = () => {
    const total = tickets.length
    const concluidos = tickets.filter(t => t.status === 'Finalizado').length
    const emAndamento = tickets.filter(t => t.status === 'EmAndamento').length
    const pendentes = tickets.filter(t => t.status === 'Aberto').length

    return { total, concluidos, emAndamento, pendentes }
  }

  const metricas = getMetricas()

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <TituloPagina titulo="Dashboard" />
    
       
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total de Tickets</h3>
          <p className="text-3xl font-bold mt-2">{metricas.total}</p>
        </div>
        <div className="bg-green-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Concluídos</h3>
          <p className="text-3xl font-bold mt-2">{metricas.concluidos}</p>
        </div>
        <div className="bg-yellow-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Em Andamento</h3>
          <p className="text-3xl font-bold mt-2">{metricas.emAndamento}</p>
        </div>
        <div className="bg-red-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Pendentes</h3>
          <p className="text-3xl font-bold mt-2">{metricas.pendentes}</p>
        </div>
      </motion.div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Tickets</h2>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="todos">Todos</option>
            <option value="Aberto">Pendentes</option>
            <option value="EmAndamento">Em Andamento</option>
            <option value="Finalizado">Concluídos</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : (
          <div className="space-y-4">
            {tickets.length > 0 && tickets?.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className=""
              
              >
                <Link className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition-all cursor-pointer" href={`/dashboard/ticket/${ticket.id}`}>
             
              <div className='flex gap-4 justify-center items-center'>    
                {getStatusIcon(ticket.status)}
                  <div>
                    <h3 className="font-semibold">{ticket.titulo}</h3>
                    <p className="text-sm text-gray-400">{ticket.empresa.nome}</p>
                  </div>
                  <div className='flex text-sm'>
                    <p>{ticket.statusPagamento}</p>
                  </div>
                </div>
                 
                <div className="text-right">
                  <p className="text-sm">{new Date(ticket.dataSolicitacao).toLocaleDateString()}</p>
                  <p className="text-[#F3F821]">R$ {ticket.valorServico.toFixed(2)}</p>
                </div>
             </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}