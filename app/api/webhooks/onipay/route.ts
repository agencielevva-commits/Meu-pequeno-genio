import { createHmac, timingSafeEqual } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db, orders } from '@/lib/db'

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-onipay-signature') || ''
  const token = process.env.ONIPAY_TOKEN_API || ''
  const expected = `sha256=${createHmac('sha256', token).update(rawBody).digest('hex')}`
  const received = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  if (received.length !== expectedBuffer.length || !timingSafeEqual(received, expectedBuffer)) return new NextResponse('assinatura inválida', { status: 401 })
  try {
    const event = JSON.parse(rawBody) as { type?: string; event?: string; id?: string; data?: { externalId?: string }; externalId?: string }
    if (event.type !== 'deposit.paid' && event.event !== 'deposit.paid') return new NextResponse(null, { status: 204 })
    const externalId = event.data?.externalId || event.externalId
    if (externalId) await db.update(orders).set({ status: 'PAID', updatedAt: new Date() }).where(eq(orders.externalId, externalId))
    return new NextResponse(null, { status: 204 })
  } catch { return new NextResponse('JSON inválido', { status: 400 }) }
}
