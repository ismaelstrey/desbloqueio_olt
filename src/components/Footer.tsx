'use client';

import { BsWhatsapp, BsEnvelope, BsLinkedin } from 'react-icons/bs';
import { motion } from 'framer-motion';

export function Footer() {
  const socialLinks = [
    {
      icon: <BsWhatsapp className="w-5 h-5" />,
      label: 'WhatsApp',
      href: 'https://wa.me/5551981754701'
    },
    {
      icon: <BsEnvelope className="w-5 h-5" />,
      label: 'Email',
      href: 'mailto:ismaelstrey@gmail.com'
    },
    {
      icon: <BsLinkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ismaelstrey/'
    }
  ];

  return (
    <footer className="bg-background/20 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Contato</h3>
            <p className="text-gray-300">Entre em contato conosco para mais informações</p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                aria-label={`Contate-nos via ${link.label}`}
                title={`Contate-nos via ${link.label}`}
              >
                {link.icon}
                <span className="sr-only">{`Contate-nos via ${link.label}`}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 text-sm text-gray-400"
        >
          © {new Date().getFullYear()} Atualização OLT Huawei. Todos os direitos reservados.
        </motion.div>
      </div>
    </footer>
  );
}