import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req });
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');
  const isAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');

  // Permitir rotas de autenticação sem token
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Verificar token para rotas da API
  if (isApiRoute && !token) {
    return new NextResponse(
      JSON.stringify({ error: 'Não autorizado - Autenticação necessária' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return NextResponse.next();
}