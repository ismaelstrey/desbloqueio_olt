import { Hero } from '@/components/Hero';
import { Sobre } from '@/components/Sobre';
import { Beneficios } from '@/components/Beneficios';
import { Footer } from '@/components/Footer';
import { VantagensOLT } from '@/components/VantagensOLT';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>

        <Navbar />
        <Hero />
        <Sobre />
        <Beneficios />
        <VantagensOLT/>
      </main>
      <Footer />
    </div>
  );
}
