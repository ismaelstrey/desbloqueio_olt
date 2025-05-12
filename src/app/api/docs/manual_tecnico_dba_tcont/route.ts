import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const docsDirectory = path.join(process.cwd(), 'docs');
    const filePath = path.join(docsDirectory, 'manual_tecnico_dba_tcont.md');
    const content = await fs.readFile(filePath, 'utf8');

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Erro ao ler arquivo markdown:', error);
    return new NextResponse('Erro ao carregar documento', { status: 500 });
  }
}