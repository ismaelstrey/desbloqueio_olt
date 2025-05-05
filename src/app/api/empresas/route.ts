import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/services/prisma';
import { getToken } from 'next-auth/jwt';

// Schema de validação para Empresa
const empresaSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  userId: z.string().min(1, 'Usuario precisa está logado'),
  cnpj: z.string().regex(/^\d{14}$/, 'CNPJ deve conter 14 dígitos'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
  endereco: z.string().optional(),
});

// GET /api/empresas
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

    // Se for CLIENTE, retorna apenas a empresa do usuário
    if (user.role === 'CLIENTE') {
      if (!user.empresaId) {
        return NextResponse.json({ error: 'Cliente sem empresa associada' }, { status: 400 });
      }
      const empresa = await prisma.empresa.findUnique({
        where: { id: user.empresaId },
        include: {
          olts: true,
          usuarios: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      });

      return NextResponse.json(empresa ? [empresa] : []);
    }

    // Para ADMIN e TECNICO, retorna todas as empresas
    const empresas = await prisma.empresa.findMany({
      include: {
        olts: true,
        usuarios: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        nome: 'asc'
      }
    });

    return NextResponse.json(empresas);
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar empresas' },
      { status: 500 }
    );
  }
}

// POST /api/empresas
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();
    const validacao = empresaSchema.safeParse(body);

    if (!validacao.success) {
      return NextResponse.json(
        { error: validacao.error.errors },
        { status: 400 }
      );
    }

    const empresaExistente = await prisma.empresa.findUnique({
      where: { cnpj: body.cnpj },
    });

    if (empresaExistente) {
      return NextResponse.json(
        { error: 'CNPJ já cadastrado' },
        { status: 400 }
      );
    }
const {userId, ...novaEmpresa} = validacao.data
    const empresa = await prisma.empresa.create({
      data: novaEmpresa 
    });

    // Associar o usario logado a empresa
   const usuario =  await prisma.user.update({
      where: { id: userId },
      data: { empresaId: empresa.id },
    });

    return NextResponse.json({empresa,usuario}, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    return NextResponse.json(
      { error: 'Erro ao criar empresa' },
      { status: 500 }
    );
  }
}