'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';
import Image from 'next/image';
import Link from 'next/link';
export function Hero() {
  return (
    <section id="inicio" className="min-h-[100vh] mt-4 bg-no-repeat md:flex-row flex-col flex items-center justify-center text-center px-4 md:px-8 mx-auto">   
   <div>  
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className=" h-full w-full md:w-6xl absolute top-0 left-0 z-[-1]"
      >    
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
        className="text-lg w-full md:text-xl text-center text-gray-300 mb-8 text-italic"
      >
        Desbloqueio e atualização de firmware para maximizar o desempenho das suas redes.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link href="/cadastro">
        <Button className="cursor-pointer" title='Solicitar atualização'>       
          Solicitar Atualização
        </Button>
      </Link>
      </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
      <Image src="/olt1.svg" width={500} height={500} alt="Hero Image" priority className="w-full h-full" />
      </motion.div>
    </section>
  );
}