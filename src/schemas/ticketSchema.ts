import { z } from 'zod'

export const ticketSchema = z.object({
  titulo: z.string().min(3, { message: 'O título deve ter no mínimo 3 caracteres' }),
  descricao: z.string().min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' }),
  tipoServico: z.enum(['Atualizacao', 'Desbloqueio', 'AtualizacaoEDesbloqueio'], {
    errorMap: () => ({ message: 'Tipo de serviço inválido' })
  }),
  status: z.enum(['Aberto', 'EmAndamento', 'Finalizado', 'Cancelado'], {
    errorMap: () => ({ message: 'Status inválido' })
  }).default('Aberto'),
  valorServico: z.number().min(0, { message: 'O valor deve ser maior que zero' }),
  statusPagamento: z.enum(['Pendente', 'Pago', 'Cancelado'], {
    errorMap: () => ({ message: 'Status de pagamento inválido' })
  }).default('Pendente'),
  tipoPagamento: z.enum(['Pix', 'Boleto', 'Dinheiro', 'CartaoCredito', 'CartaoDebito'], {
    errorMap: () => ({ message: 'Tipo de pagamento inválido' })
  }).optional(),
  empresaId: z.number(),
  oltId: z.number(),
  criadoPorId: z.string()
})

export type TicketFormData = z.infer<typeof ticketSchema>