import { Ticket } from "@/@types/models"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export const useFetch = () => {
  const [result, setResult] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const route = useRouter()

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tickets' + (filtroStatus !== 'todos' ? `?status=${filtroStatus}` : ''))
if (!response.ok) {
    setError('Erro ao carregar tickets')
        throw new Error('Erro ao carregar tickets')
      }
      setLoading(false) 
      const data = await response.json()     
      if(data.error){
        toast.error(data.error)
        route.push('/os/empresa/nova')
        return
      }
      setTickets(data)
      setResult(data.length)
    } catch (error) {
      console.error('Erro ao carregar tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  return  {
    result,
    loading,
    error,
    tickets,
    filtroStatus,
    setFiltroStatus,
    fetchTickets
  }
}