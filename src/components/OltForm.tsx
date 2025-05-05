'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useTicketForm } from '@/hooks/useTicketForm';

const oltSchema = z.object({
  empresaId: z.number().min(1, 'Empresa é obrigatória'),
  userId: z.string().min(1, 'Usuário precisa estar logado'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  marca: z.string().min(1, 'Marca é obrigatória'),
  modelo: z.string().min(1, 'Modelo é obrigatório'),
  tipo: z.string().min(1, 'Tipo é obrigatório'),
  firmware: z.string().min(1, 'Firmware é obrigatório'),
  firmwareTipo: z.string().min(1, 'Tipo de Firmware é obrigatório'),
  ipAcesso: z.string().regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'IP inválido'),
  usuario: z.string().min(1, 'Usuário é obrigatório'),
  senha: z.string().min(1, 'Senha é obrigatória'),
  localizacao: z.string().min(1, 'Localização é obrigatória'),
  observacoes: z.string().optional(),
});

type OltFormData = z.infer<typeof oltSchema>;

export default function OltForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const {empresas} = useTicketForm()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!session?.user?.email) {
      setError('Usuário não está logado');
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data: OltFormData = {
      empresaId: Number(formData.get('empresaId')),
      userId: (session.user as {id:string})?.id || '',
      nome: formData.get('nome') as string,
      marca: formData.get('marca') as string,
      modelo: formData.get('modelo') as string,
      tipo: formData.get('tipo') as string,
      firmware: formData.get('firmware') as string,
      firmwareTipo: formData.get('firmwareTipo') as string,
      ipAcesso: formData.get('ipAcesso') as string,
      usuario: formData.get('usuario') as string,
      senha: formData.get('senha') as string,
      localizacao: formData.get('localizacao') as string,
      observacoes: formData.get('observacoes') as string,
    };

    try {
      const validacao = oltSchema.parse(data);
      const response = await fetch('/api/olts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validacao),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao cadastrar OLT');
      }
      toast.success('OLT cadastrada com sucesso');
      router.push('/os');
    } catch (erro) {
      if (erro instanceof z.ZodError) {
        setError(erro.errors[0].message);
      } else if (erro instanceof Error) {
        setError(erro.message);
      } else {
        setError('Erro ao cadastrar OLT');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de OLT</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="empresaId" className="block text-sm font-medium text-white">
            ID da Empresa*
          </label>

          <select
            id="empresaId"
            name="empresaId"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
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
          <label htmlFor="nome" className="block text-sm font-medium text-white">
            Nome da OLT*
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="marca" className="block text-sm font-medium text-white">
            Marca*
          </label>
          <input
            type="text"
            id="marca"
            name="marca"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="modelo" className="block text-sm font-medium text-white">
            Modelo*
          </label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-white">
            Tipo*
          </label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            defaultValue="GPON"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="firmware" className="block text-sm font-medium text-white">
            Firmware*
          </label>
          <input
            type="text"
            id="firmware"
            name="firmware"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="firmwareTipo" className="block text-sm font-medium text-white">
            Tipo de Firmware*
          </label>
          <input
            type="text"
            id="firmwareTipo"
            name="firmwareTipo"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="ipAcesso" className="block text-sm font-medium text-white">
            IP de Acesso*
          </label>
          <input
            type="text"
            id="ipAcesso"
            name="ipAcesso"
            required
            placeholder="192.168.1.1"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="usuario" className="block text-sm font-medium text-white">
            Usuário*
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-white">
            Senha*
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="localizacao" className="block text-sm font-medium text-white">
            Localização*
          </label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="observacoes" className="block text-sm font-medium text-white">
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            rows={3}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#F3F821] text-black py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar OLT'}
        </button>
      </form>
    </div>
  );
}