import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const userObj = await currentUser()
  if (!userObj) return new NextResponse("Unauthorized", { status: 401 })
  let user = await prisma.user.findUnique({ where: { clerkId: userObj.id }, include: { store: true } })
  if (!user) {
    user = await prisma.user.create({ data: { clerkId: userObj.id, email: userObj.emailAddresses?.[0]?.emailAddress ?? "" } })
  }
  return NextResponse.json(user.store ?? null)
}

export async function PUT(req: Request) {
  const userObj = await currentUser()
  if (!userObj) return new NextResponse("Unauthorized", { status: 401 })
  const data = await req.json()
  let user = await prisma.user.findUnique({ where: { clerkId: userObj.id } })
  if (!user) {
    user = await prisma.user.create({ data: { clerkId: userObj.id, email: userObj.emailAddresses?.[0]?.emailAddress ?? data.email ?? "" } })
  }
  const store = await prisma.store.upsert({
    where: { userId: user.id },
    update: {
      name: data.name,
      username: data.username,
      bio: data.bio ?? null,
      logoUrl: data.logoUrl ?? null,
      whatsappNumber: data.whatsappNumber ?? null,
    },
    create: {
      userId: user.id,
      name: data.name,
      username: data.username,
      bio: data.bio ?? null,
      logoUrl: data.logoUrl ?? null,
      whatsappNumber: data.whatsappNumber ?? null,
    },
  })
  return NextResponse.json(store)
}


