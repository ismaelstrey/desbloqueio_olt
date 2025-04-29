import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/services/prisma';
import { getToken } from 'next-auth/jwt';
import { TipoOlt } from '@/@types/models';


// Schema de validação para atualização de OLT
const oltUpdateSchema = z.object({
  empresaId: z.number().int().positive('ID da empresa é obrigatório').optional(),
  nome: z.string().min(1, 'Nome é obrigatório').optional(),
  marca: z.string().min(1, 'Marca é obrigatória').optional(),
  modelo: z.string().min(1, 'Modelo é obrigatório').optional(),
  tipo: z.nativeEnum(TipoOlt, {
    errorMap: () => ({ message: 'Tipo de OLT inválido' }),
  }).optional(),
  firmware: z.string().min(1, 'Firmware é obrigatório').optional(),
  firmwareTipo: z.string().min(1, 'Tipo de firmware é obrigatório').optional(),
  ipAcesso: z.string().optional(),
  usuario: z.string().optional(),
  senha: z.string().optional(),
  localizacao: z.string().optional(),
  observacoes: z.string().optional(),
});

// GET /api/olts/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    const novoId = (await params).id;

    const id = parseInt(novoId);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const olt = await prisma.olt.findUnique({
      where: { id },
      include: {
        empresa: true,
        tickets: true,
      },
    });

    if (!olt) {
      return NextResponse.json({ error: 'OLT não encontrada' }, { status: 404 });
    }

    return NextResponse.json(olt);
  } catch (error) {
    console.error('Erro ao buscar OLT:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar OLT' },
      { status: 500 }
    );
  }
}

// PUT /api/olts/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const novoId = (await params).id;

    const id = parseInt(novoId);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const body = await req.json();
    const validacao = oltUpdateSchema.safeParse(body);

    if (!validacao.success) {
      return NextResponse.json(
        { error: validacao.error.errors },
        { status: 400 }
      );
    }

    // Verificar se a OLT existe
    const oltExistente = await prisma.olt.findUnique({
      where: { id },
    });

    if (!oltExistente) {
      return NextResponse.json(
        { error: 'OLT não encontrada' },
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

    const olt = await prisma.olt.update({
      where: { id },
      data: validacao.data,
      include: {
        empresa: true,
      },
    });

    return NextResponse.json(olt);
  } catch (error) {
    console.error('Erro ao atualizar OLT:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar OLT' },
      { status: 500 }
    );
  }
}

// DELETE /api/olts/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const novoId = (await params).id;
    const id = parseInt(novoId);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    // Verificar se a OLT existe e se possui tickets
    const oltExistente = await prisma.olt.findUnique({
      where: { id },
      include: {
        tickets: true,
      },
    });

    if (!oltExistente) {
      return NextResponse.json(
        { error: 'OLT não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se existem tickets associados
    if (oltExistente.tickets.length > 0) {
      return NextResponse.json(
        { error: 'Não é possível excluir uma OLT com tickets associados' },
        { status: 400 }
      );
    }

    await prisma.olt.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'OLT excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir OLT:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir OLT' },
      { status: 500 }
    );
  }
}