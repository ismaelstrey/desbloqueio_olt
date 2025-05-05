import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import  prisma  from '@/services/prisma';

export async function roleMiddleware() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { empresa: true }
  });

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  return {
    user,
    isAdmin: user.role === 'ADMIN',
    isTecnico: user.role === 'TECNICO',
    isCliente: user.role === 'CLIENTE',
    empresaId: user.empresaId
  };
}