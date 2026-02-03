import Header from '@/components/header'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'
import BookingItem from '@/components/booking-item'
import { getConfirmedBookings } from '../_data/get-confirmed-bookings'
import { getConcludedBookings } from '../_data/get-concluded-bookings'
import BookingsLoginAlert from '@/components/booking-login-item'

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return <BookingsLoginAlert />
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  const hasBookings =
    confirmedBookings.length > 0 || concludedBookings.length > 0

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl space-y-6 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {!hasBookings && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 font-bold uppercase text-gray-400">
              Confirmados
            </h2>

            <div className="grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mt-6 font-bold uppercase text-gray-400">
              Finalizados
            </h2>

            <div className="grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default Bookings
