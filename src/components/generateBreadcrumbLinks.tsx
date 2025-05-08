import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GenerateBreadcrumbLinks() {
  const path = usePathname()
    const segments = path.split('/').filter(Boolean); // Remove partes vazias (ex: split gera ['', 'page', 'home'])
    
    return segments.map((slug, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/'); // Constrói o caminho acumulado
      return (
        <Link className={`hover:text-accent text-sm opacity-50 hover:opacity-90 ${index ===0 ? 'text-accent': ''}`} key={href} href={href}>
          /{slug}
        </Link>
      );
    });
  }
  
