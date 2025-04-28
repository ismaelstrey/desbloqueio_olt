'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface Empresa {
  id: number
  nome: string
  olts: Array<{
    id: number
    nome: string
  }>
}

export default function NovoTicket() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [selectedEmpresa, setSelectedEmpresa] = useState('')
  const [selectedOlt, setSelectedOlt] = useState('')
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipoServico: 'Desbloqueio', // DESBLOQUEIO, ATUALIZACAO
    valorServico: '1000',
     criadoPor: "usuario@exemplo.com"
  })


  const fetchEmpresas = async () => {
    try {
      const response = await fetch('/api/empresas')
      const data = await response.json()
      setEmpresas(data)
    } catch (error) {
      console.error('Erro ao buscar empresas:', error)
    }
  }
  useEffect(() => {
    fetchEmpresas()
  }, [] )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          empresaId: parseInt(selectedEmpresa),
          oltId: parseInt(selectedOlt),
          status: 'Aberto',
          statusPagamento: 'Pendente',
          valorServico: parseFloat(formData.valorServico)
        }),
      })

      if (response.ok) {
        router.push('/os')
      } else {
        throw new Error('Erro ao criar ticket')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao criar ticket. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Novo Ticket</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="empresa">
              Empresa
            </label>
            <select
              id="empresa"
              value={selectedEmpresa}
              onChange={(e) => setSelectedEmpresa(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
              required
            >
              <option value="">Selecione uma empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="olt">
              OLT
            </label>
            <select
              id="olt"
              value={selectedOlt}
              onChange={(e) => setSelectedOlt(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
              required
              disabled={!selectedEmpresa}
            >
              <option value="">Selecione uma OLT</option>
              {selectedEmpresa && empresas
                .find(e => e.id === parseInt(selectedEmpresa))?.olts
                .map((olt) => (
                  <option key={olt.id} value={olt.id}>
                    {olt.nome}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="titulo">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="descricao">
              Descrição
            </label>
            <textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="tipoServico">
              Tipo de Serviço
            </label>
            <select
              id="tipoServico"
              value={formData.tipoServico}
              onChange={(e) => setFormData({ ...formData, tipoServico: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
              required
            >
              <option value="Desbloquio">Desbloqueio</option>
              <option value="Atualizacao">Atualização</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="valorServico">
              Valor do Serviço (R$)
            </label>
            <input
              type="number"
              id="valorServico"
              value={formData.valorServico}
              onChange={(e) => setFormData({ ...formData, valorServico: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F3F821] text-black py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Criando...' : 'Criar Ticket'}
        </button>
      </form>
    </motion.div>
  )
}