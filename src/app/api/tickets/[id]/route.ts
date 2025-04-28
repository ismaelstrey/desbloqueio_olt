import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/services/prisma';
import { getToken } from 'next-auth/jwt';
import { TipoServico, StatusTicket, StatusPagamento, TipoPagamento } from '@prisma/client';

// Schema de validação para atualização de Ticket
const ticketUpdateSchema = z.object({
  empresaId: z.number().int().positive('ID da empresa é obrigatório').optional(),
  oltId: z.number().int().positive('ID da OLT é obrigatório').optional(),
  titulo: z.string().min(1, 'Título é obrigatório').optional(),
  descricao: z.string().min(1, 'Descrição é obrigatória').optional(),
  tipoServico: z.nativeEnum(TipoServico, {
    errorMap: () => ({ message: 'Tipo de serviço inválido' }),
  }).optional(),
  status: z.nativeEnum(StatusTicket, {
    errorMap: () => ({ message: 'Status inválido' }),
  }).optional(),
  valorServico: z.number().positive('Valor do serviço deve ser positivo').optional(),
  statusPagamento: z.nativeEnum(StatusPagamento, {
    errorMap: () => ({ message: 'Status de pagamento inválido' }),
  }).optional(),
  tipoPagamento: z.nativeEnum(TipoPagamento, {
    errorMap: () => ({ message: 'Tipo de pagamento inválido' }),
  }).optional(),
  dataConclusao: z.date().optional(),
  resolvidoPor: z.string().optional(),
});

// GET /api/tickets/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        empresa: true,
        olt: true,
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket não encontrado' }, { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Erro ao buscar ticket:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar ticket' },
      { status: 500 }
    );
  }
}

// PUT /api/tickets/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const body = await req.json();
    const validacao = ticketUpdateSchema.safeParse(body);

    if (!validacao.success) {
      return NextResponse.json(
        { error: validacao.error.errors },
        { status: 400 }
      );
    }

    // Verificar se o ticket existe
    const ticketExistente = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticketExistente) {
      return NextResponse.json(
        { error: 'Ticket não encontrado' },
        { status: 404 }
      );
    }

    // Se empresaId foi fornecido, verificar se a empresa existe
    if (validacao.data.empresaId) {
      const empresa = await prisma.empresa.findUnique({
        where: { id: validacao.data.empresaId },
      });

      if (!empresa) {
        return NextResponse.json(
          { error: 'Empresa não encontrada' },
          { status: 404 }
        );
      }
    }

    // Se oltId foi fornecido, verificar se a OLT existe e pertence à empresa correta
    if (validacao.data.oltId) {
      const olt = await prisma.olt.findFirst({
        where: {
          id: validacao.data.oltId,
          empresaId: validacao.data.empresaId || ticketExistente.empresaId,
        },
      });

      if (!olt) {
        return NextResponse.json(
          { error: 'OLT não encontrada ou não pertence à empresa informada' },
          { status: 404 }
        );
      }
    }

    // Se o status está sendo alterado para Finalizado, definir a data de conclusão
    if (validacao.data.status === StatusTicket.Finalizado && !ticketExistente.dataConclusao) {
      validacao.data.dataConclusao = new Date();
    }

    const ticket = await prisma.ticket.update({
      where: { id },
      data: validacao.data,
      include: {
        empresa: true,
        olt: true,
      },
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Erro ao atualizar ticket:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar ticket' },
      { status: 500 }
    );
  }
}

// DELETE /api/tickets/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    // Verificar se o ticket existe
    const ticketExistente = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticketExistente) {
      return NextResponse.json(
        { error: 'Ticket não encontrado' },
        { status: 404 }
      );
    }

    // Não permitir exclusão de tickets finalizados ou com pagamento realizado
    if (
      ticketExistente.status === StatusTicket.Finalizado ||
      ticketExistente.statusPagamento === StatusPagamento.Pago
    ) {
      return NextResponse.json(
        { error: 'Não é possível excluir um ticket finalizado ou com pagamento realizado' },
        { status: 400 }
      );
    }

    await prisma.ticket.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Ticket excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir ticket:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir ticket' },
      { status: 500 }
    );
  }
}