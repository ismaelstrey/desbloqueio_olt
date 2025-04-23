'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaServer, FaShieldAlt, FaCogs } from 'react-icons/fa';
import { RiSpeedFill } from 'react-icons/ri';
import { TbVersions } from 'react-icons/tb';

const AnimatedSection = ({ children, delay = 0 }:{children:ReactNode, delay?:number}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

const versoes = [
  {
    versao: 'R17',
    novidades: ['Suporte inicial a XGS-PON', 'Melhorias no DBA'],
    recomendacao: 'Descontinuada (migrar para R19+)',
    status: 'obsoleta'
  },
  {
    versao: 'R18',
    novidades: ['Suporte a mais ONTs', 'Correções de estabilidade'],
    recomendacao: 'Estável, mas sem patches recentes',
    status: 'antiga'
  },
  {
    versao: 'R19',
    novidades: ['Otimização de QoS', 'Suporte a IPv6 nativo'],
    recomendacao: 'Bom para redes atuais',
    status: 'estavel'
  },
  {
    versao: 'R21',
    novidades: ['Melhorias no 10G GPON', 'Segurança reforçada'],
    recomendacao: 'Versão intermediária',
    status: 'recomendada'
  },
  {
    versao: 'R22',
    novidades: [
      'Suporte a PON inteligente (IA-driven DBA)',
      'Compatibilidade com Wi-Fi 6 ONTs',
      'Patch SPC011+ com correções críticas'
    ],
    recomendacao: 'Recomendada para upgrades',
    status: 'atual'
  }
];

const beneficios = [
  {
    titulo: 'Melhorias de Desempenho',
    icon: RiSpeedFill,
    items: [
      'Redução de latência em redes GPON/XGS-PON',
      'Otimização de buffer para alta demanda',
      'Correção de bugs críticos'
    ]
  },
  {
    titulo: 'Novos Recursos',
    icon: FaCogs,
    items: [
      'Suporte a novos modelos de ONTs',
      'Compatibilidade com XGS-PON e 10G GPON',
      'Melhorias no DBA'
    ]
  },
  {
    titulo: 'Segurança Reforçada',
    icon: FaShieldAlt,
    items: [
      'Correção de vulnerabilidades',
      'Autenticação reforçada',
      'Suporte a TLS 1.3'
    ]
  },
  {
    titulo: 'Facilidade de Gerenciamento',
    icon: FaServer,
    items: [
      'CLI e U2000 mais intuitivos',
      'Integração com Huawei iMaster NCE',
      'Gestão centralizada de redes FTTH'
    ]
  }
];

export function VantagensOLT() {
  return (
    <section id="vantagens" className="py-16 px-4 md:px-8 bg-background/5">
      <div className="max-w-7xl mx-auto mt-8">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Vantagens de Atualizar sua OLT Huawei MA5800-X7
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Comparativo entre Versões R17 a R22
          </p>
        </AnimatedSection>

        {/* Por que Atualizar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {beneficios.map((beneficio, index) => (
            <AnimatedSection key={beneficio.titulo} delay={index * 0.1}>
              <div className="p-6 rounded-lg bg-background/10 hover:bg-background/15 transition-all">
                <div className="flex items-center mb-4">
                  <beneficio.icon className="w-6 h-6 text-accent mr-3" />
                  <h3 className="text-xl font-semibold">{beneficio.titulo}</h3>
                </div>
                <ul className="space-y-2">
                  {beneficio.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Comparativo entre Versões */}
        <AnimatedSection>
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
            <TbVersions className="w-6 h-6 mr-2 text-accent" />
            Comparativo Entre Versões
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-left">Versão</th>
                  <th className="py-4 px-6 text-left">Principais Novidades</th>
                  <th className="py-4 px-6 text-left">Recomendação</th>
                </tr>
              </thead>
              <tbody>
                {versoes.map((versao, index) => (
                  <motion.tr
                    key={versao.versao}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-700/50 hover:bg-background/10 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-semibold">{versao.versao}</span>
                    </td>
                    <td className="py-4 px-6">
                      <ul className="list-disc list-inside space-y-1">
                        {versao.novidades.map((novidade, i) => (
                          <li key={i} className="text-gray-300">{novidade}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${versao.status === 'atual' ? 'bg-accent/20 text-accent' : 'bg-gray-700/50 text-gray-300'}`}
                      >
                        {versao.recomendacao}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Conclusão */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 p-6 rounded-lg bg-accent/5 border border-accent/20">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaCheckCircle className="w-5 h-5 text-accent mr-2" />
              Conclusão
            </h3>
            <p className="text-gray-300 mb-4">
              Atualizar sua OLT Huawei MA5800-X7 para a R22 (ou ao menos para a R21 com patches recentes)
              é essencial para garantir:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaCheckCircle className="w-4 h-4 text-accent mr-2" />
                <span>Maior velocidade e estabilidade</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="w-4 h-4 text-accent mr-2" />
                <span>Suporte a novas ONTs e tecnologias (XGS-PON, Wi-Fi 6)</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="w-4 h-4 text-accent mr-2" />
                <span>Proteção contra vulnerabilidades conhecidas</span>
              </li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}