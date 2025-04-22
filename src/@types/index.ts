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

export interface ButtonMotionProps extends ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>,  React.ButtonHTMLAttributes<HTMLButtonElement> {
  
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}
