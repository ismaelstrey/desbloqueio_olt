import { ForwardRefComponent, HTMLMotionProps } from "framer-motion";

export interface ContactFormData {
  nome: string;
  empresa: string;
  whatsapp: string;
  descricao: string;
  olt_quantia: number;
  email: string;
}

export interface BeneficioProps {
  titulo: string;
  descricao: string;
  icone: string;
}

export interface  Olt {
  id: number;
  nome: string;
  descricao: string;
  numero_series: number;
  olt_modelo: OltModelo;
  versao_firmware: string;
  usuario: string;
  senha: string;
  status: string;
  porta: number; 

}

export interface OltModelo {
  id: number;
  nome: string;
  descricao: string;
  marca: OltMarca;
}

export interface OltMarca {
  id: number;
  nome: string;
  descricao: string;
  modelos: OltModelo[]|[];
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
