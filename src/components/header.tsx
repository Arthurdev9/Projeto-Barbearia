'use client'

import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { CalendarIcon, MenuIcon } from 'lucide-react'
import { Sheet, SheetTrigger } from './ui/sheet'

import Sidebar from './sidebar-sheet'
import Link from 'next/link'
import { UserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import SignInDialog from './sign-in-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import SignOut from './sign-out'

const Header = () => {
  const { data } = useSession()

  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href={'/'}>
          <Image src="/logo.png" height={18} width={120} alt="FSW barber" />
        </Link>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="md:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <Button className="hidden md:flex" variant="ghost" asChild>
              <Link href={'/bookings'}>
                <CalendarIcon />
                Agendamentos
              </Link>
            </Button>
            <Sidebar />
          </Sheet>
          {data?.user ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="hidden cursor-pointer items-center gap-2 md:flex">
                  <Avatar>
                    <AvatarImage
                      src={data.user.image ?? ''}
                      referrerPolicy="no-referrer"
                    />
                  </Avatar>
                  <p className="font-bold">{data.user.name}</p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-[90%] max-w-sm">
                <SignOut />
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button size={'default'} className="hidden text-sm md:flex">
                  <UserRound />
                  Perfil
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
