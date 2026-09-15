import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-onipay-signature') || ''
  const token = process.env.ONIPAY_TOKEN_API || ''
  const expected = `sha256=${createHmac('sha256', token).update(rawBody).digest('hex')}`
  const received = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  const valid = received.length === expectedBuffer.length && timingSafeEqual(received, expectedBuffer)
  if (!valid) return new NextResponse('assinatura inválida', { status: 401 })
  try { JSON.parse(rawBody) } catch { return new NextResponse('JSON inválido', { status: 400 }) }
  return new NextResponse(null, { status: 204 })
}
