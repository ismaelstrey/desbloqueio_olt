import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@prisma/client';

type RouteConfig = {
  roles: Role[];
};

const protectedRoutes: Record<string, RouteConfig> = {
  '/api/empresas': { roles: ['ADMIN'] },
  '/api/olts': { roles: ['ADMIN', 'TECNICO'] },
  '/api/tickets': { roles: ['ADMIN', 'TECNICO', 'CLIENTE'] },
};

export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const isApiRoute = pathname.startsWith('/api');
  const isAuthRoute = pathname.startsWith('/api/auth');

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

  // Verificar permissões baseadas em role
  const userRole = token?.role as Role;
  
  for (const [route, config] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route) && !config.roles.includes(userRole)) {
      return new NextResponse(
        JSON.stringify({ error: 'Acesso negado - Permissão insuficiente' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  return NextResponse.next();
}