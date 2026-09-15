import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db, orders } from '@/lib/db'

export async function GET(_request: Request, { params }: { params: Promise<{ externalId: string }> }) {
  const { externalId } = await params
  const result = await db.select({ status: orders.status }).from(orders).where(eq(orders.externalId, externalId)).limit(1)
  if (!result[0]) return NextResponse.json({ error: 'Pedido não encontrado.' }, { status: 404 })
  return NextResponse.json({ status: result[0].status })
}
