import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const userObj = await currentUser()
  if (!userObj) return new NextResponse("Unauthorized", { status: 401 })
  const user = await prisma.user.findUnique({ where: { clerkId: userObj.id }, include: { store: true } })
  if (!user?.store) return NextResponse.json({ products: [] })
  const products = await prisma.product.findMany({ where: { storeId: user.store.id }, orderBy: { createdAt: "desc" } })
  return NextResponse.json({ products })
}

export async function POST(req: Request) {
  const userObj = await currentUser()
  if (!userObj) return new NextResponse("Unauthorized", { status: 401 })
  const body = await req.json()
  const user = await prisma.user.findUnique({ where: { clerkId: userObj.id }, include: { store: { include: { products: true } } } })
  if (!user?.store) return new NextResponse("No store", { status: 400 })
  // Free plan (default): limit to 3 products
  if (user.store.products.length >= 3) {
    return new NextResponse("Free plan limit reached (3 products)", { status: 403 })
  }
  const product = await prisma.product.create({
    data: {
      storeId: user.store.id,
      name: body.name,
      priceCents: Math.round(Number(body.price) * 100),
      description: body.description ?? null,
      imageUrl: body.imageUrl ?? null,
    },
  })
  return NextResponse.json(product, { status: 201 })
}


