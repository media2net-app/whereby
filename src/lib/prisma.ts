import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use Prisma Accelerate if DATABASE_URL starts with prisma+postgres://
const accelerateUrl = process.env.DATABASE_URL?.startsWith('prisma+postgres://')
  ? process.env.DATABASE_URL
  : undefined

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  ...(accelerateUrl && {
    accelerateUrl,
  }),
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
