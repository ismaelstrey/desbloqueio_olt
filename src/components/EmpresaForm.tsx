'use client';

import {  useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';

const empresaSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cnpj: z.string().regex(/^\d{14}$/, 'CNPJ deve conter 14 dígitos'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
  endereco: z.string().optional(),
  userId: z.string().min(1, 'Usuário precisa estar logado'),
});

type EmpresaFormData = z.infer<typeof empresaSchema>;

export default function EmpresaForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);


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
    const data: EmpresaFormData = {
      nome: formData.get('nome') as string,
      cnpj: formData.get('cnpj') as string,
      email: formData.get('email') as string,
      telefone: formData.get('telefone') as string,
      endereco: formData.get('endereco') as string,
      userId:  (session.user as {id:string})?.id || '',
    };

    try {
      const validacao = empresaSchema.parse(data);
      const response = await fetch('/api/empresas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validacao),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao cadastrar empresa');
      }
      toast.success('Empresa cadastrada com sucesso');
      router.push('/os'); // Redireciona após sucesso
    } catch (erro) {
      if (erro instanceof z.ZodError) {
        setError(erro.errors[0].message);
      } else if (erro instanceof Error) {
        setError(erro.message);
      } else {
        setError('Erro ao cadastrar empresa');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Empresa</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-white">
            Nome da Empresa*
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
          <label htmlFor="cnpj" className="block text-sm font-medium text-white">
            CNPJ*
          </label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            required
            maxLength={14}
            placeholder="00000000000000"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-white">
            Telefone*
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            required
            minLength={10}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="endereco" className="block text-sm font-medium text-white">
            Endereço
          </label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#F3F821] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#F3F821] text-black py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar Empresa'}
        </button>
      </form>

    </div>
  );
}