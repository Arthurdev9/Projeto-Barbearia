'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'
import { prisma } from 'lib/prisma'

export const getConfirmedBookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return []
  }

  return await prisma.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date()
      }
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    },
    orderBy: {
      date: 'asc'
    }
  })
}
