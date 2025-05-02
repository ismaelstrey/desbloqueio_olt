'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTicketForm } from '@/hooks/useTicketForm'

export default function NovoTicket() {
  const {
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
  } = useTicketForm()

  useEffect(() => {
    fetchEmpresas()
    initializeUserData()
  }, [])



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Novo Ticket</h1>    
     
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="titulo">
              ID
            </label>
            <input
              type="text"
              disabled
              id="criadoPorId"
              name="criadoPorId"
              value={formData.criadoPorId}
              className="w-full opacity-50 bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="empresa">
              Empresa
            </label>
            <select
              id="empresa"
              name="empresaId"
              value={selectedEmpresa}
              onChange={handleEmpresaChange}
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
            {errors.empresaId && (
              <p className="text-red-500 text-sm mt-1">{errors.empresaId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="olt">
              OLT
            </label>
            <select
              id="olt"
              name="oltId"
              value={selectedOlt}
              onChange={handleOltChange}
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
            {errors.oltId && (
              <p className="text-red-500 text-sm mt-1">{errors.oltId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="titulo">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
              required
            />
            {errors.titulo && (
              <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="descricao">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none min-h-[100px]"
              required
            />
            {errors.descricao && (
              <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="tipoServico">
              Tipo de Serviço
            </label>
            <select
              id="tipoServico"
              name="tipoServico"
              value={formData.tipoServico}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
              required
            >
              <option value="Desbloqueio">Desbloqueio</option>
              <option value="Atualizacao">Atualização</option>
            </select>
            {errors.tipoServico && (
              <p className="text-red-500 text-sm mt-1">{errors.tipoServico}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="valorServico">
              Valor do Serviço (R$)
            </label>
            <input
              type="number"
              id="valorServico"
              name="valorServico"
              value={formData.valorServico}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
              required
              min="0"
              step="0.01"
            />
            {errors.valorServico && (
              <p className="text-red-500 text-sm mt-1">{errors.valorServico}</p>
            )}
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