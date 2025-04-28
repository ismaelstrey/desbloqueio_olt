import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/services/prisma';
import { getToken } from 'next-auth/jwt';
import { TipoOlt } from '@prisma/client';

// Schema de validação para OLT
const oltSchema = z.object({
  empresaId: z.number().int().positive('ID da empresa é obrigatório'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  marca: z.string().min(1, 'Marca é obrigatória'),
  modelo: z.string().min(1, 'Modelo é obrigatório'),
  tipo: z.nativeEnum(TipoOlt, {
    errorMap: () => ({ message: 'Tipo de OLT inválido' }),
  }),
  firmware: z.string().min(1, 'Firmware é obrigatório'),
  firmwareTipo: z.string().min(1, 'Tipo de firmware é obrigatório'),
  ipAcesso: z.string().optional(),
  usuario: z.string().optional(),
  senha: z.string().optional(),
  localizacao: z.string().optional(),
  observacoes: z.string().optional(),
});

// GET /api/olts
export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const empresaId = searchParams.get('empresaId');

    const where = empresaId ? { empresaId: parseInt(empresaId) } : {};

    const olts = await prisma.olt.findMany({
      where,
      include: {
        empresa: true,
        tickets: true,
      },
    });

    return NextResponse.json(olts);
  } catch (error) {
    console.error('Erro ao buscar OLTs:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar OLTs' },
      { status: 500 }
    );
  }
}

// POST /api/olts
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();
    const validacao = oltSchema.safeParse(body);

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

    const olt = await prisma.olt.create({
      data: validacao.data,
      include: {
        empresa: true,
      },
    });

    return NextResponse.json(olt, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar OLT:', error);
    return NextResponse.json(
      { error: 'Erro ao criar OLT' },
      { status: 500 }
    );
  }
}