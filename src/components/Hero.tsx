'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';

export function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[80vh] bg-no-repeat flex flex-col items-center justify-center text-center px-4 md:px-8 mx-auto">
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[url(/olt3.png)] bg-contain bg-no-repeat bg-center h-full w-6xl absolute top-0 left-0 z-[-1]"
      >
        <div className="bg-background opacity-80 h-full w-full absolute top-0 left-0 z-[-1]"></div>
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold mb-11 leading-tight"
      >
        Atualize e Libere sua OLT Huawei com
        <span className="text-accent"> Rapidez e Segurança</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl"
      >
        Desbloqueio e atualização de firmware para maximizar o desempenho das suas redes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button onClick={scrollToContact}>
          Solicitar Atualização
        </Button>
      </motion.div>
    </section>
  );
}