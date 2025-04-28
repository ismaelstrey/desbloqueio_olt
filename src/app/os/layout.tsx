import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard - Sistema de Ordens de Serviço',
  description: 'Gerencie suas ordens de serviço para OLTs',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}