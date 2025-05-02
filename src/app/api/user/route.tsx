import prisma from "@/services/prisma";
import { NextResponse } from "next/server";


export async function GET() {
const data = await prisma.user.findMany(
    {
        include: {
        empresa: true,
        Ticket: true,
        accounts: true,
        }
     
    }
)

return NextResponse.json(data)
}