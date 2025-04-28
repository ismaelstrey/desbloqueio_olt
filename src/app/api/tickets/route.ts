import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/services/prisma';
import { getToken } from 'next-auth/jwt';
import { TipoServico, StatusTicket, StatusPagamento, TipoPagamento } from '@prisma/client';

// Schema de validação para Ticket
const ticketSchema = z.object({
  empresaId: z.number().int().positive('ID da empresa é obrigatório'),
  oltId: z.number().int().positive('ID da OLT é obrigatório'),
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  tipoServico: z.nativeEnum(TipoServico, {
    errorMap: () => ({ message: 'Tipo de serviço inválido' }),
  }),
  status: z.nativeEnum(StatusTicket, {
    errorMap: () => ({ message: 'Status inválido' }),
  }),
  valorServico: z.number().positive('Valor do serviço deve ser positivo'),
  statusPagamento: z.nativeEnum(StatusPagamento, {
    errorMap: () => ({ message: 'Status de pagamento inválido' }),
  }),
  tipoPagamento: z.nativeEnum(TipoPagamento, {
    errorMap: () => ({ message: 'Tipo de pagamento inválido' }),
  }).optional(),
  dataConclusao: z.date().optional(),
  criadoPor: z.string().min(1, 'Criador é obrigatório'),
  resolvidoPor: z.string().optional(),
});

// GET /api/tickets
export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const empresaId = searchParams.get('empresaId');
    const oltId = searchParams.get('oltId');
    const status = searchParams.get('status') as StatusTicket | null;

    const where: any = {};
    if (empresaId) where.empresaId = parseInt(empresaId);
    if (oltId) where.oltId = parseInt(oltId);
    if (status) where.status = status;

    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        empresa: true,
        olt: true,
      },
      orderBy: {
        dataSolicitacao: 'desc',
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Erro ao buscar tickets:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar tickets' },
      { status: 500 }
    );
  }
}

// POST /api/tickets
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();
    const validacao = ticketSchema.safeParse(body);

    if (!validacao.success) {
      return NextResponse.json(
        { error: validacao.error.errors },
        { status: 400 }
      );
    }

    // Verificar se a empresa existe
    const empresa = await prisma.empresa.findUnique({
      where: { id: validacao.data.empresaId },
    });

    if (!empresa) {
      return NextResponse.json(
        { error: 'Empresa não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se a OLT existe e pertence à empresa
    const olt = await prisma.olt.findFirst({
      where: {
        id: validacao.data.oltId,
        empresaId: validacao.data.empresaId,
      },
    });

    if (!olt) {
      return NextResponse.json(
        { error: 'OLT não encontrada ou não pertence à empresa informada' },
        { status: 404 }
      );
    }

    const ticket = await prisma.ticket.create({
      data: {
        ...validacao.data,
        dataSolicitacao: new Date(),
      },
      include: {
        empresa: true,
        olt: true,
      },
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    return NextResponse.json(
      { error: 'Erro ao criar ticket' },
      { status: 500 }
    );
  }
}