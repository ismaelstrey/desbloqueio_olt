'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaBook } from 'react-icons/fa';

type Doc = {
  name: string;
  content: string;
};

export default function DocsViewerV2() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch('/api/docs');
        const data = await response.json();
        // Formata o nome do documento para exibição
        const formattedDocs = data.map((doc: Doc) => ({
          ...doc,
          name: doc.name
            .replace('.md', '')
            .split('_')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        }));
        setDocs(formattedDocs);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar documentos:', error);
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  return (
    <div className="min-h-screen h-full overflow-hidden bg-[#0F0F0F] text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex items-center mb-8 space-x-3">
          <FaBook className="text-[#F3F821] text-2xl" />
          <h1 className="text-2xl font-bold">Documentação Técnica</h1>
        </div>

        <div className="grid md:grid-cols-[300px,1fr] gap-8">
          {/* Lista de Documentos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 p-4 rounded-lg shadow-xl h-fit"
          >
            <h2 className="text-xl font-semibold mb-4">Documentos Disponíveis</h2>
            <ul className="space-y-2">
              {docs.map((doc) => (
                <motion.li
                  key={doc.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                      selectedDoc?.name === doc.name 
                        ? 'bg-[#F3F821] text-black' 
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    {doc.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Visualizador de Markdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 p-6 rounded-lg shadow-xl overflow-y-hidden"
          >
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F3F821]"></div>
              </div>
            ) : selectedDoc ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{    
                      // @ts-expect-error - Component includes custom props not expected by parent               
                  code: ({inline, className, children, ...props}) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        // @ts-expect-error - Component includes custom props not expected by parent
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({...props}) => <h1 className="text-3xl font-bold mb-6 text-[#F3F821]" {...props} />,
                  h2: ({...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                  h3: ({...props}) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
                  p: ({...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                  ul: ({...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  ol: ({...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                  li: ({...props}) => <li className="ml-4" {...props} />,
                  table: ({...props}) => (
                    <div className="overflow-x-hidden mb-6">
                      <table className="min-w-full divide-y divide-gray-700" {...props} />
                    </div>
                  ),
                  thead: ({...props}) => <thead className="bg-gray-900" {...props} />,
                  th: ({...props}) => (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" {...props} />
                  ),
                  td: ({...props}) => <td className="px-6 py-4 whitespace-nowrap text-sm" {...props} />,
                }}
              >
                {selectedDoc.content}
              </ReactMarkdown>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <p>Selecione um documento para visualizar</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}