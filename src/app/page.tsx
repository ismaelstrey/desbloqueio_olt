import { Hero } from '@/components/Hero';
import { Sobre } from '@/components/Sobre';
import { Beneficios } from '@/components/Beneficios';
import { Contato } from '@/components/Contato';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <Hero />
        <Sobre />
        <Beneficios />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
