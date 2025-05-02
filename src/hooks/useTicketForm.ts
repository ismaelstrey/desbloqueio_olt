import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { ticketSchema, type TicketFormData } from '@/schemas/ticketSchema'
import toast from 'react-hot-toast'

interface Empresa {
  id: number
  nome: string
  olts: Array<{
    id: number
    nome: string
  }>
}

export function useTicketForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [selectedEmpresa, setSelectedEmpresa] = useState('')
  const [selectedOlt, setSelectedOlt] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<TicketFormData>({
    titulo: '',
    descricao: '',
    tipoServico: 'Desbloqueio',
    valorServico: 1000,
    status: 'Aberto',
    statusPagamento: 'Pendente',
    tipoPagamento: 'Pix',
    criadoPorId: '',
    empresaId: 0,
    oltId: 0
  })

  const fetchEmpresas = useCallback(async () => {
    try {
      const response = await fetch('/api/empresas')
      const data = await response.json()
      setEmpresas(data)
    } catch (error) {
      console.error('Erro ao buscar empresas:', error)
    }
  }, [])

  const initializeUserData = useCallback(async () => {
    const user = await getSession()
    if (user?.user) {
      setFormData(prev => ({
        ...prev,
        criadoPor: user.user?.email || '',
        criadoPorId: (user.user as {id:string})?.id || ''
      }))
    }
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const handleEmpresaChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedEmpresa(value)
    setSelectedOlt('')
    setFormData(prev => ({ ...prev, empresaId: parseInt(value), oltId: 0 }))
  }, [])

  const handleOltChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedOlt(value)
    setFormData(prev => ({ ...prev, oltId: parseInt(value) }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    console.log({formData})

    try {
      const validatedData = ticketSchema.parse(formData)

      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validatedData,
          status: 'Aberto',
          statusPagamento: 'Pendente'
        }),
      })

      if (response.ok) {
        toast.success('Ticket criado com sucesso!')
        router.push('/os')
      } else {
        throw new Error('Erro ao criar ticket')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro:', error)
        alert('Erro ao criar ticket. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }, [formData, router])

  return {
    loading,
    empresas,
    selectedEmpresa,
    selectedOlt,
    formData,
    errors,
    fetchEmpresas,
    initializeUserData,
    handleInputChange,
    handleEmpresaChange,
    handleOltChange,
    handleSubmit
  }
}