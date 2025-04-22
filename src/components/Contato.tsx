'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ContactFormData } from '@/@types';

export function Contato() {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    empresa: '',
    whatsapp: '',
    descricao: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de envio do formulário
    console.log('Dados do formulário:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contato" className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
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

          <Button type="submit" className="w-full">
            Quero Atualizar Agora
          </Button>
        </div>
      </motion.form>
    </section>
  );
}