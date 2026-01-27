'use server'

import { prisma } from 'lib/prisma'

interface CreateBookingParams {
  serviceId: string
  userId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  await prisma.booking.create({
    data: params
  })
}
