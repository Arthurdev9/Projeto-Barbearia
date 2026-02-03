import { Button } from '@/components/ui/button'
import { prisma } from 'lib/prisma'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import ServiceItem from '@/components/service-item'
import PhoneItem from '@/components/phone-item'
import Sidebar from '@/components/sidebar-sheet'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import Header from '@/components/header'
import DescriptionBarbershopDesktop from '@/components/description-barbershop-desktop'

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await prisma.barbershop.findUnique({
    where: { id: params.id },
    include: {
      services: true
    }
  })

  if (!barbershop) return notFound()

  return (
    <div className="w-full">
      <div className="hidden w-full lg:block">
        <Header />
      </div>
      <main className="mx-auto mt-8 flex min-h-screen w-full max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <section className="w-full lg:w-2/3">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              width={750}
              height={480}
              priority
              className="w-full object-cover"
            />
            <div className="border-b p-5 lg:flex lg:items-center lg:justify-between">
              <h1 className="mb-3 text-xl font-bold lg:mb-0 lg:text-2xl">
                {barbershop.name}
              </h1>

              <div className="mb-2 flex items-center gap-1 lg:mb-0">
                <MapPinIcon size={18} className="text-primary" />
                <p className="text-sm lg:text-base">{barbershop.address}</p>
              </div>

              <div className="flex items-center gap-1">
                <StarIcon size={18} className="fill-primary text-primary" />
                <p className="text-sm lg:text-base">5,0 (499 avaliações)</p>
              </div>
            </div>
            <div className="space-y-2 border-b p-5 lg:hidden">
              <h2 className="text-xs font-bold uppercase text-gray-400">
                Sobre nós
              </h2>
              <p className="text-justify text-sm">{barbershop.description}</p>
            </div>
            <div className="space-y-3 border-b p-5 lg:mt-5">
              <h2 className="text-xs font-bold uppercase text-gray-400 lg:text-sm">
                Serviços
              </h2>

              <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                {barbershop.services.map((service) => (
                  <ServiceItem
                    key={service.id}
                    barbershop={JSON.parse(JSON.stringify(barbershop))}
                    service={JSON.parse(JSON.stringify(service))}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3 p-5 lg:hidden">
              {barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
              ))}
            </div>
          </section>
          <aside className="sticky top-6 hidden lg:block lg:w-1/3">
            <DescriptionBarbershopDesktop
              name={barbershop.name}
              address={barbershop.address}
              about={barbershop.description}
              imageUrl={barbershop.imageUrl}
              phones={barbershop.phones}
            />
          </aside>
        </div>
      </main>

      <div className="lg:hidden">
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </div>
    </div>
  )
}

export default BarbershopPage
