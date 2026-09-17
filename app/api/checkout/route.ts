import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { db, orders } from '@/lib/db'

const ONIPAY_URL = 'https://onipaybot.com.br/api/v1/deposits/'

const ONIPAY_CALLBACK_URL = 'https://esperancadobem.vercel.app/api/webhooks/onipay'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const amount = Number(body.amount)
    const amountInCents = Math.round(amount * 100)
    if (!Number.isInteger(amountInCents) || amountInCents < 1000 || amountInCents > 100000) {
      return NextResponse.json({ error: 'Escolha um valor entre R$ 10,00 e R$ 1.000,00.' }, { status: 422 })
    }
    const token = process.env.ONIPAY_TOKEN_API
    if (!token) return NextResponse.json({ error: 'Gateway PIX indisponível.' }, { status: 503 })
    const externalId = randomUUID()
    await db.insert(orders).values({ id: randomUUID(), externalId, amount: amountInCents, status: 'PENDING', createdAt: new Date(), updatedAt: new Date() })
    const response = await fetch(ONIPAY_URL, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Idempotency-Key': externalId }, body: JSON.stringify({ amount: amountInCents / 100, callbackUrl: ONIPAY_CALLBACK_URL, externalId }), cache: 'no-store' })
    const data = await response.json().catch(() => null)
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || 'A OniPay não conseguiu gerar o PIX.' }, { status: 502 })
    const pix = data?.data?.pix || data?.pix || data?.data
    return NextResponse.json({ externalId, pix }, { status: 201 })
  } catch (error) {
    console.error('[v0] checkout error', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Não foi possível gerar o PIX.' }, { status: 500 })
  }
}
