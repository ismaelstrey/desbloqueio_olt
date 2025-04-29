'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FaCheckCircle, FaHourglassHalf, FaExclamationCircle } from 'react-icons/fa'

interface Ticket {
  id: number
  titulo: string
  descricao: string
  status: string
  tipoServico: string
  valorServico: number
  statusPagamento: string
  dataSolicitacao: string
  dataConclusao: string | null
  empresa: {
    nome: string
  }
  olt: {
    nome: string
    modelo: string
  }
}

export default function TicketDetalhes({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [atualizando, setAtualizando] = useState(false)
  const [id, setId] = useState<number>(0)

 async function getId () {
    const meuId = await params
    setId(Number(meuId.id))
  }

  useEffect(() => {
    getId()
    id && fetchTicket()
  },[id])

  const fetchTicket = async () => {
    try {
      const response = await fetch(`/api/tickets/${id}`)
      if (response.ok) {
        const data = await response.json()
        setTicket(data)
      } else {
        throw new Error('Ticket não encontrado')
      }
    } catch (error) {
      console.error('Erro ao carregar ticket:', error)
      router.push('/os')
    } finally {
      setLoading(false)
    }
  }

  const atualizarStatus = async (novoStatus: string) => {
    if (!ticket) return

    setAtualizando(true)
    try {
      const response = await fetch(`/api/tickets`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: novoStatus,
          id
        }),
      })

      if (response.ok) {
        const ticketAtualizado = await response.json()
        setTicket(ticketAtualizado)
      } else {
        throw new Error('Erro ao atualizar status')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao atualizar status. Tente novamente.')
    } finally {
      setAtualizando(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Finalizado':
        return 'text-green-500'
      case 'EmAndamento':
        return 'text-yellow-500'
      case 'Aberto':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Finalizado':
        return <FaCheckCircle className="text-green-500" />
      case 'EmAndamento':
        return <FaHourglassHalf className="text-yellow-500" />
      case 'PENDENTE':
        return <FaExclamationCircle className="text-red-500" />
      default:
        return null
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  if (!ticket) {
    return <div className="text-center py-8">Ticket não encontrado</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{ticket.titulo}</h1>
        <button
          onClick={() => router.push('/os')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Voltar
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Informações do Ticket</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Status:</span>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon(ticket.status)}
                  <span className={getStatusColor(ticket.status)}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-gray-400">Tipo de Serviço:</span>
                <p>{ticket.tipoServico.replace('_', ' ')}</p>
              </div>
              <div>
                <span className="text-gray-400">Valor:</span>
                <p className="text-[#F3F821]">R$ {ticket.valorServico.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-gray-400">Status do Pagamento:</span>
                <p>{ticket.statusPagamento.replace('_', ' ')}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Detalhes do Cliente</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Empresa:</span>
                <p>{ticket.empresa.nome}</p>
              </div>
              <div>
                <span className="text-gray-400">OLT:</span>
                <p>{ticket.olt.nome}</p>
              </div>
              <div>
                <span className="text-gray-400">Modelo:</span>
                <p>{ticket.olt.modelo}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Descrição</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{ticket.descricao}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Datas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400">Solicitação:</span>
              <p>{new Date(ticket.dataSolicitacao).toLocaleDateString()}</p>
            </div>
            {ticket.dataConclusao && (
              <div>
                <span className="text-gray-400">Conclusão:</span>
                <p>{new Date(ticket.dataConclusao).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Atualizar Status</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => atualizarStatus('EmAndamento')}
            disabled={atualizando || ticket.status === 'EmAndamento' || ticket.status === 'Finalizado'}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Em Andamento
          </button>
          <button
            onClick={() => atualizarStatus('Finalizado')}
            disabled={atualizando || ticket.status === 'Finalizado'}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Concluído
          </button>
        </div>
      </div>
    </motion.div>
  )
}