import { ForwardRefComponent, HTMLMotionProps } from "framer-motion";

export interface ContactFormData {
  nome: string;
  empresa: string;
  whatsapp: string;
  descricao: string;
}

export interface BeneficioProps {
  titulo: string;
  descricao: string;
  icone: string;
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export interface ButtonProps extends ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

// ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>