'use server'

import { prisma } from 'lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteBooking = async (bookingId: string) => {
  await prisma.booking.delete({
    where: {
      id: bookingId
    }
  })
  revalidatePath('/bookings')
}
