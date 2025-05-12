import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface DocInfo {
  name: string;
  content: string;
}

export async function GET() {
  try {
    const docsDirectory = path.join(process.cwd(), 'docs');
    const files = await fs.readdir(docsDirectory);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const docs: DocInfo[] = await Promise.all(
      markdownFiles.map(async (fileName) => {
        const filePath = path.join(docsDirectory, fileName);
        const content = await fs.readFile(filePath, 'utf8');
        return {
          name: fileName,
          content
        };
      })
    );

    return NextResponse.json(docs, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao ler arquivos markdown:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar documentos' },
      { status: 500 }
    );
  }
}