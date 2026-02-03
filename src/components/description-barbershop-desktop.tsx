import Image from 'next/image'
import { Avatar, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardFooter } from './ui/card'
import PhoneItem from './phone-item'

interface DescriptionBarbershopDesktopProps {
  name: string
  address: string
  about: string
  imageUrl: string
  phones: string[]
}

const DescriptionBarbershopDesktop = ({
  about,
  address,
  name,
  imageUrl,
  phones
}: DescriptionBarbershopDesktopProps) => {
  return (
    <Card className="relative mx-auto h-[880px] w-[430px] p-5">
      <div className="relative mt-6 flex h-[180px] w-[380px]">
        <Image
          src="/map.png"
          fill
          className="rounded-xl object-cover"
          alt={`Mapa da barbearia ${name}`}
        />
        <CardContent className="absolute top-20 z-50">
          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{name}</h3>
                <p className="text-xs">{address}</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </div>
      <div className="flex w-full flex-col pt-4">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre Nós</h2>
        <p className="text-justify text-sm"> {about}</p>
        <div className="mb-4 mt-5 space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Telefones
          </h2>

          {phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
        <div className="mt-5 flex justify-between">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-gray-400">Segunda</p>
            <p className="text-xs font-bold uppercase text-gray-400">Terça</p>
            <p className="text-xs font-bold uppercase text-gray-400">Quarta</p>
            <p className="text-xs font-bold uppercase text-gray-400">Quinta</p>
            <p className="text-xs font-bold uppercase text-gray-400">Sexta</p>
            <p className="text-xs font-bold uppercase text-gray-400">Sábado</p>
            <p className="text-xs font-bold uppercase text-gray-400">Domingo</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-gray-400">Fechado</p>
            <p className="text-xs font-bold uppercase text-gray-400">
              08:00 - 18:00
            </p>
            <p className="text-xs font-bold uppercase text-gray-400">
              08:00 - 18:00
            </p>
            <p className="text-xs font-bold uppercase text-gray-400">
              08:00 - 18:00
            </p>
            <p className="text-xs font-bold uppercase text-gray-400">
              08:00 - 18:00
            </p>
            <p className="text-xs font-bold uppercase text-gray-400">
              08:00 - 18:00
            </p>
            <p className="text-xs font-bold uppercase text-gray-400">Fechado</p>
          </div>
        </div>
      </div>
      <CardFooter className="absolute bottom-0 space-x-12">
        <p>Em parceria com</p>
        <Image src="/logo.png" height={18} width={120} alt="FSW barber" />
      </CardFooter>
    </Card>
  )
}

export default DescriptionBarbershopDesktop
