import BarbershopItem from '@/components/barbershop-item'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import BookingItem from '@/components/booking-item'
import Search from '@/components/search'

import Image from 'next/image'
import Link from 'next/link'

import { prisma } from 'lib/prisma'
import { quickSearchOption } from './_constants/search'
import { getConfirmedBookings } from './_data/get-confirmed-bookings'

import { getServerSession } from 'next-auth'
import { authOptions } from './lib/auth'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const barbershops = await prisma.barbershop.findMany({})
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: { name: 'desc' }
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <>
      <Header />
      <section className="relative">
        <div className="absolute inset-0 -z-10 hidden md:block">
          <Image
            src="/bg-desktop.png"
            fill
            alt="background"
            className="object-fill opacity-25 brightness-90 grayscale"
          />
        </div>
        <div className="p-5 md:mx-auto md:grid md:max-w-7xl md:grid-cols-2 md:gap-20">
          <div className="w-full">
            <h2 className="text-xl font-bold">
              Olá, {session?.user?.name ?? 'Bem-vindo'}
            </h2>

            <p className="capitalize">
              {format(new Date(), 'EEEE, dd ', { locale: ptBR })}
              {format(new Date(), "'de' MMMM", { locale: ptBR })}
            </p>

            <div className="mt-6">
              <Search />
            </div>
            <div className="mt-6 flex gap-3 overflow-x-auto md:hidden [&::-webkit-scrollbar]:hidden">
              {quickSearchOption.map((option) => (
                <Button
                  key={option.title}
                  variant="secondary"
                  className="gap-2"
                  asChild
                >
                  <Link href={`/barbershops?service=${option.title}`}>
                    <Image
                      src={option.imageUrl}
                      width={16}
                      height={16}
                      alt={option.title}
                    />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>
            <div className="relative mt-6 h-[150px] w-full md:hidden">
              <Image
                src="/banner01.png"
                alt="Agende nos melhores com FSW Barber"
                fill
                className="rounded-xl object-cover"
              />
            </div>
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
                  Agendamentos
                </h2>

                <div className="flex gap-3 overflow-x-auto md:max-h-[320px] md:flex-col md:overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="w-full md:mt-5">
            <h2 className="mb-3 hidden font-bold uppercase text-gray-400 md:flex">
              Recomendados
            </h2>

            <Carousel opts={{ align: 'start', dragFree: true }}>
              <CarouselContent className="hidden md:flex">
                {barbershops.map((barbershop) => (
                  <CarouselItem
                    key={barbershop.id}
                    className="basis-[80%] sm:basis-1/2 md:basis-1/3"
                  >
                    <BarbershopItem barbershop={barbershop} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-10">
        <div className="md:hidden">
          <h2 className="mb-3 mt-10 font-bold uppercase text-gray-400">
            Recomendados
          </h2>

          <Carousel opts={{ align: 'start', dragFree: true }}>
            <CarouselContent>
              {barbershops.map((barbershop) => (
                <CarouselItem
                  key={barbershop.id}
                  className="basis-[80%] sm:basis-1/2"
                >
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <h2 className="mb-3 mt-10 font-bold uppercase text-gray-400">
          Populares
        </h2>

        <Carousel opts={{ align: 'start', dragFree: true }}>
          <CarouselContent>
            {popularBarbershops.map((barbershop) => (
              <CarouselItem
                key={barbershop.id}
                className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
        <h2 className="mb-3 mt-10 font-bold uppercase text-gray-400">
          Mais Visitados
        </h2>

        <Carousel opts={{ align: 'start', dragFree: true }}>
          <CarouselContent>
            {popularBarbershops.map((barbershop) => (
              <CarouselItem
                key={barbershop.id}
                className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>
    </>
  )
}
