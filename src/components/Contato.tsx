'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ContactFormData } from '@/@types';
import { IoCloseSharp } from 'react-icons/io5';
import Link from 'next/link';
import toast from "react-hot-toast";

export function Contato() {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    empresa: '',
    whatsapp: '',
    descricao: '',
    olt_quantia: 0,
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success('Mensagem enviada com sucesso!');
      setFormData({
        nome: '',
        empresa: '',
        whatsapp: '',
        descricao: '',
        olt_quantia: 0,
        email: '',
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
   <div className='fixed z-40 top-0 left-0 bg-background w-screen min-h-screen '> 
   <Link href="/">
   <IoCloseSharp title='fechar' className='fixed top-12 right-12 hover:scale-110 cursor-pointer' color='red' size={60}/>
   </Link>
     <section id="contato" className=" py-16 justify-center content-center min-h-screen px-4 md:px-8 mx-auto">      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Entre em Contato</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Preencha o formulário abaixo para solicitar uma atualização ou tirar suas dúvidas
        </p>
      </motion.div>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-background/5 p-6 md:p-8 rounded-lg"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-2">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-background/20 border border-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-background/20 border border-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-2">
              Quantas OLT
            </label>
            <input
              type="number"
              id="olt_quantia"
              name="olt_quantia"
              value={formData.olt_quantia}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-background/20 border border-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="empresa" className="block text-sm font-medium mb-2">
              Empresa
            </label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-background/20 border border-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
              WhatsApp
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-background/20 border border-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium mb-2">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-background/20 border border-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
            />
          </div>

          <Button className="w-full cursor-pointer" title='Quero artualizar minha olt'>
            Quero Atualizar Agora
          </Button>
        </div>
      </motion.form>
    </section>
   </div>
  );
}