'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    console.log('Fazendo login com Google...');
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/os'
      });

      if (result?.error) {
        console.error('Erro ao fazer login:', result.error);
        return;
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#F3F821]">
          Acesso ao Sistema
        </h1>
        <div className="space-y-4" onClick={handleGoogleLogin}>
          <Button
            onClick={handleGoogleLogin}
            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            <FcGoogle className="text-2xl" />
            Entrar com Google
          </Button>
        </div>
      </div>
    </div>
  );
}