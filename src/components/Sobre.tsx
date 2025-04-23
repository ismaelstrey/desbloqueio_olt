'use client';

import { AnimatedSection } from './AnimatedSection';
import { BsShieldLock, BsRocket, BsShieldCheck, BsGraphUp } from 'react-icons/bs';

export function Sobre() {
  const beneficios = [
    {
      icone: <BsShieldLock className="w-8 h-8 text-accent" />,
      titulo: 'Desbloqueio Seguro',
      descricao: 'Processo seguro e confiável para liberar sua OLT'
    },
    {
      icone: <BsRocket className="w-8 h-8 text-accent" />,
      titulo: 'Atualização Rápida',
      descricao: 'Atualizações de firmware com mínimo tempo de inatividade'
    },
    {
      icone: <BsShieldCheck className="w-8 h-8 text-accent" />,
      titulo: 'Garantia de Segurança',
      descricao: 'Proteção total dos dados durante todo o processo'
    },
    {
      icone: <BsGraphUp className="w-8 h-8 text-accent" />,
      titulo: 'Melhora de Performance',
      descricao: 'Otimização do desempenho da sua rede'
    }
  ];

  return (
    <section className='w-full bg-accent text-background'>
    <div className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
    <AnimatedSection className="text-center mb-12 ">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre o Serviço</h2>
        <p className="text-gray-900 max-w-2xl mx-auto">
          Mantenha sua OLT Huawei atualizada e desbloqueada para aproveitar todo o potencial do seu equipamento.
          Nossa solução profissional garante um processo seguro e eficiente.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {beneficios.map((beneficio, index) => (
          <AnimatedSection key={beneficio.titulo} delay={index * 0.1}>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background hover:bg-background/20 transition-colors">
              {beneficio.icone}
              <h3 className="text-xl font-semibold mt-4 mb-2 text-accent">{beneficio.titulo}</h3>
              <p className="text-gray-300">{beneficio.descricao}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
    </section>
  );
}