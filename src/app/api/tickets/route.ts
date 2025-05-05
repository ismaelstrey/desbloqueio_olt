import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/services/prisma';
import { getToken } from 'next-auth/jwt';
import { StatusTicket, TipoServico, StatusPagamento, TipoPagamento } from '@prisma/client';

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
  criadoPorId: z.string().min(1, 'ID do criador é obrigatório'),
  resolvidoPorId: z.string().optional(),
});

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
  resolvidoPorId: z.string().optional(),
});

// GET /api/tickets
export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Buscar usuário e suas informações
    const user = await prisma.user.findUnique({
      where: { email: token.email! },
      include: { empresa: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const searchParams = req.nextUrl.searchParams;
    const oltId = searchParams.get('oltId');
    const status = searchParams.get('status') as StatusTicket | null;

    interface WhereClause {
      empresaId?: number;
      oltId?: number;
      status?: StatusTicket;
    }

    const where: WhereClause = {};

    // Se for CLIENTE, força filtrar pela empresa do usuário
    if (user.role === 'CLIENTE') {
      if (!user.empresaId) {
        return NextResponse.json({ error: 'Cliente sem empresa associada' }, { status: 400 });
      }
      where.empresaId = user.empresaId;
    } else if (user.role === 'TECNICO') {
      // Técnicos podem ver tickets de todas as empresas
      const empresaId = searchParams.get('empresaId');
      if (empresaId) where.empresaId = parseInt(empresaId);
    } else {
      // Admins podem filtrar por qualquer empresa
      const empresaId = searchParams.get('empresaId');
      if (empresaId) where.empresaId = parseInt(empresaId);
    }

    if (oltId) where.oltId = parseInt(oltId);
    if (status) where.status = status;

    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        empresa: true,
        olt: true,
        criadoPor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        resolvidoPor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        dataSolicitacao: 'desc',
      },
    });

    console.log(tickets);

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


    console.log(body);
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

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();
   
    const validacao = ticketUpdateSchema.safeParse(body);

    const {id} = body;
 console.log(body);
    if (!id) {
      return NextResponse.json(
        { error: 'ID do ticket é obrigatório' },
        { status: 400 }
      );
    }

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