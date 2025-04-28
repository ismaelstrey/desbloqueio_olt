import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/services/prisma';
import { getToken } from 'next-auth/jwt';

// GET /api/empresas/[id]
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

    const empresa = await prisma.empresa.findUnique({
      where: { id },
      include: {
        olts: true,
        tickets: true,
      },
    });

    if (!empresa) {
      return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 });
    }

    return NextResponse.json(empresa);
  } catch (error) {
    console.error('Erro ao buscar empresa:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar empresa' },
      { status: 500 }
    );
  }
}
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

    // Verificar se a empresa existe
    const empresaExistente = await prisma.empresa.findUnique({
      where: { id },
      include: {
        olts: true,
        tickets: true,
      },
    });

    if (!empresaExistente) {
      return NextResponse.json(
        { error: 'Empresa não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se existem OLTs ou tickets associados
    if (empresaExistente.olts.length > 0 || empresaExistente.tickets.length > 0) {
      return NextResponse.json(
        { error: 'Não é possível excluir uma empresa com OLTs ou tickets associados' },
        { status: 400 }
      );
    }

    await prisma.empresa.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Empresa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir empresa' },
      { status: 500 }
    );
  }
}