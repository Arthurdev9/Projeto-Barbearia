'use server'

import { endOfDay, startOfDay } from 'date-fns'
import { prisma } from 'lib/prisma'

interface getBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = ({ date }: getBookingsProps) => {
  return prisma.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date)
      }
    }
  })
}
