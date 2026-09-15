import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { pgTable, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core'

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey(),
  externalId: text('external_id').notNull().unique(),
  amount: integer('amount').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
})

export const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool, { schema: { orders } })

export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED'
