import prisma from "@/services/prisma";
import { NextResponse } from "next/server";


export async function GET() {
const data = await prisma.account.findMany(
    {
        include: {
        user: true
        }
    }
)

return NextResponse.json(data)
}