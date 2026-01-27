'use server'

import { prisma } from 'lib/prisma'
import { revalidatePath } from 'next/cache'

interface CreateBookingParams {
  serviceId: string
  userId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  await prisma.booking.create({
    data: params
  })
  revalidatePath('/barbershops/[id]')
}
