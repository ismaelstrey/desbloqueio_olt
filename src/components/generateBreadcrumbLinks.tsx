import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";

export default function GenerateBreadcrumbLinks() {
  const path = usePathname()
    const segments = path.split('/').filter(Boolean); // Remove partes vazias (ex: split gera ['', 'page', 'home'])
    const tamanho = segments.length as number;
    if (tamanho === 0 || tamanho === 1) {
      return null; // Retorna null se não houver partes para construir os links
    }
    return segments.map((slug, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/'); // Constrói o caminho acumulado
      return (
        <Link className={`hover:text-accent text-sm opacity-50 hover:opacity-90 ${index ===0 ? 'text-accent': ''}`} key={href} href={href}>
         {index === 0 ? <IoHomeOutline/> : `/${slug}`} 
        </Link>
      );
    });
  }
  
