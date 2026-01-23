import BarbershopItem from '@/components/barbershop-item'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { prisma } from 'lib/prisma'
import { quickSearchOption } from './_constants/search'

import Image from 'next/image'
import BookingItem from '@/components/booking-item'
import Search from '@/components/search'
import Link from 'next/link'

export default async function Home() {
  const barbershops = await prisma.barbershop.findMany({})
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: { name: 'desc' }
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Arthur!</h2>
        <p>Segunda-feira, 05 de Janeiro.</p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOption.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
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

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner01.png"
            alt="Agende nos melhores com FSW Barber"
            className="rounded-xl object-cover"
            fill
          />
        </div>

        <BookingItem />

        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
