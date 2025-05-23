'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const menuItems = useMemo(() => [
    { href: '#inicio', label: 'Início' },
    { href: '#vantagens', label: 'Vantagens' }
  ], []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId.replace('#', ''));
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => document.getElementById(item.href.replace('#', '')));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      setActiveSection(currentSection?.id || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]); // menuItems é seguro como dependência pois está memorizado

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-30 bg-accent backdrop-blur-sm border-b border-gray-800/20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl font-bold text-background"
          >
          <Link href="/">
            <span className="text-accent"> Atualiza Huawei</span> OLT
          </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.href}
                title={`Navvegar até ${item.label}`}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium cursor-pointer transition-colors ${activeSection === item.href.replace('#', '') ? 'text-background border-b-2  transition-all scale-110' : 'text-background hover:text-background/80'}`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item.label}
              </motion.button>
            ))}
         <Link href="/cadastro">
            <motion.button
              title="Quero atualizar minha olt"
              className="text-sm font-medium cursor-pointer transition-colors text-background hover:text-background/80"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
              > Cadastro</motion.button>
       
          </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-300 hover:text-accent"
            title="Abrir Menu"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-background/95"
      >
        <div className="px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <motion.button
              key={item.href}
              title={`Navvegar até ${item.label}`}
              onClick={() => scrollToSection(item.href)}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${activeSection === item.href.replace('#', '') ? 'text-accent bg-accent/10' : 'text-gray-300 hover:text-accent hover:bg-accent/5'}`}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.button>
          ))}
          <Link href="/cadastro" className='bg-red-500'>
            <motion.button
              title="Quero atualizar minha olt"
              className="block w-full text-left px-3 py-2 text-background hover:text-background/80 rounded-md text-base font-medium hover:bg-accent/5"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
              > Cadastro</motion.button>
       
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}