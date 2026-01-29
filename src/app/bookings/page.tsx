import Header from '@/components/header'
import { prisma } from 'lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'
import { notFound } from 'next/navigation'
import BookingItem from '@/components/booking-item'

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return notFound()
  }

  const confirmedBookings = await prisma.booking.findMany({
    where: {
      userId: (session.user as any).id,
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

  const concludedBookings = await prisma.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date()
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

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length > 0 && (
          <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
            Confirmados
          </h2>
        )}
        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
        {concludedBookings.length > 0 && (
          <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
            Finalizados
          </h2>
        )}
        {concludedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  )
}

export default Bookings
