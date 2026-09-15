import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

const ONIPAY_URL = 'https://onipaybot.com.br/api/v1/deposits/'

function publicCallbackUrl() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '')
  if (!appUrl) throw new Error('NEXT_PUBLIC_APP_URL não configurada')
  const url = new URL('/api/webhooks/onipay', appUrl)
  if (url.protocol !== 'https:') throw new Error('NEXT_PUBLIC_APP_URL precisa usar HTTPS')
  return url.toString()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const amount = Number(body.amount)
    if (!Number.isFinite(amount) || amount < 10 || amount > 1000 || Math.round(amount * 100) !== amount * 100) {
      return NextResponse.json({ error: 'Escolha um valor entre R$ 10,00 e R$ 1.000,00.' }, { status: 422 })
    }

    const token = process.env.ONIPAY_TOKEN_API
    if (!token) return NextResponse.json({ error: 'Gateway PIX indisponível.' }, { status: 503 })

    const idempotencyKey = `pix-${randomUUID()}`
    const response = await fetch(ONIPAY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100) / 100,
        callbackUrl: publicCallbackUrl(),
        externalId: `doacao-${randomUUID()}`,
      }),
      cache: 'no-store',
    })

    const data = await response.json().catch(() => null)
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || 'Não foi possível gerar o PIX.' }, { status: response.status })
    return NextResponse.json({ data: data?.data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Não foi possível conectar ao gateway PIX.' }, { status: 500 })
  }
}
