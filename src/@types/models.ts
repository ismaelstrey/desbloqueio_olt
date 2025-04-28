// Tipos para as entidades principais
export type Empresa = {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco?: string;
  createdAt: Date;
  updatedAt: Date;
  olts?: Olt[];
  tickets?: Ticket[];
};

export type Olt = {
  id: number;
  empresaId: number;
  nome: string;
  marca: string;
  modelo: string;
  tipo: TipoOlt;
  firmware: string;
  firmwareTipo: string;
  ipAcesso?: string;
  usuario?: string;
  senha?: string;
  localizacao?: string;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
  empresa?: Empresa;
  tickets?: Ticket[];
};

export type Ticket = {
  id: number;
  empresaId: number;
  oltId: number;
  titulo: string;
  descricao: string;
  tipoServico: TipoServico;
  status: StatusTicket;
  valorServico: number;
  statusPagamento: StatusPagamento;
  tipoPagamento?: TipoPagamento;
  dataSolicitacao: Date;
  dataConclusao?: Date;
  criadoPor: string;
  resolvidoPor?: string;
  createdAt: Date;
  updatedAt: Date;
  empresa?: Empresa;
  olt?: Olt;
};

// Enums
export enum TipoOlt {
  GPON = 'GPON',
  EPON = 'EPON'
}

export enum TipoServico {
  Atualizacao = 'Atualizacao',
  Desbloqueio = 'Desbloqueio',
  AtualizacaoEDesbloqueio = 'AtualizacaoEDesbloqueio'
}

export enum StatusTicket {
  Aberto = 'Aberto',
  EmAndamento = 'EmAndamento',
  Finalizado = 'Finalizado',
  Cancelado = 'Cancelado'
}

export enum StatusPagamento {
  Pendente = 'Pendente',
  Pago = 'Pago',
  Cancelado = 'Cancelado'
}

export enum TipoPagamento {
  Pix = 'Pix',
  Boleto = 'Boleto',
  Dinheiro = 'Dinheiro',
  CartaoCredito = 'CartaoCredito',
  CartaoDebito = 'CartaoDebito'
}