'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, MenuIcon, UserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Sheet, SheetTrigger } from './ui/sheet'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarImage } from './ui/avatar'

import Sidebar from './sidebar-sheet'
import SignInDialog from './sign-in-dialog'
import SignOut from './sign-out'

const Header = () => {
  const { data } = useSession()

  return (
    <header className="w-full border-b">
      <Card className="rounded-none border-none shadow-none">
        <CardContent className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
          <Link href="/">
            <Image src="/logo.png" height={18} width={120} alt="FSW barber" />
          </Link>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="md:hidden">
                  <MenuIcon />
                </Button>
              </SheetTrigger>

              <Sidebar />
            </Sheet>
            <Button className="hidden md:flex" variant="ghost" asChild>
              <Link href="/bookings">
                <CalendarIcon />
                Agendamentos
              </Link>
            </Button>
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
                  <Button className="hidden md:flex">
                    <UserRound />
                    Perfil
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[90%] max-w-sm">
                  <SignInDialog />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
