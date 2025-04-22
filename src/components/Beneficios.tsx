'use client';

import { AnimatedSection } from './AnimatedSection';
import { BsCheckCircle } from 'react-icons/bs';

export function Beneficios() {
  const vantagens = [
    {
      titulo: 'Redução de custos',
      descricao: 'Economia significativa em comparação com a aquisição de novos equipamentos'
    },
    {
      titulo: 'Atualizações homologadas',
      descricao: 'Firmware verificado e testado para garantir compatibilidade e estabilidade'
    },
    {
      titulo: 'Suporte técnico',
      descricao: 'Assistência especializada durante todo o processo de atualização'
    }
  ];

  return (
    <section className="py-16 bg-background/10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefícios</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubra as vantagens de manter sua OLT atualizada e desbloqueada
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vantagens.map((vantagem, index) => (
            <AnimatedSection key={vantagem.titulo} delay={index * 0.1}>
              <div className="flex flex-col p-6 rounded-lg bg-background/5 hover:bg-background/10 transition-colors">
                <div className="flex items-center mb-4">
                  <BsCheckCircle className="w-6 h-6 text-accent mr-3" />
                  <h3 className="text-xl font-semibold">{vantagem.titulo}</h3>
                </div>
                <p className="text-gray-300">{vantagem.descricao}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}