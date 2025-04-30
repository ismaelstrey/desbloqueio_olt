/*
  Warnings:

  - You are about to drop the column `criadoPor` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `resolvidoPor` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `criadoPorId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TECNICO', 'CLIENTE');

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "criadoPor",
DROP COLUMN "resolvidoPor",
ADD COLUMN     "criadoPorId" TEXT NOT NULL,
ADD COLUMN     "resolvidoPorId" TEXT,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "empresaId" INTEGER,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENTE';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_resolvidoPorId_fkey" FOREIGN KEY ("resolvidoPorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
