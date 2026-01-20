import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

const BookingItem = () => {
  return (
    <>
      <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
        Agendamentos
      </h2>
      <Card>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit rounded-full">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>

            <div className="flex items-center">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/logo.png" />
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="tex-sm">Janeiro</p>
            <p className="text-2xl">19</p>
            <p className="text-sm">14:53</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
