'use client'

import { quickSearchOption } from '@/app/_constants/search'
import { Button } from './ui/button'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from './ui/avatar'
import SignInDialog from './sign-in-dialog'

const Sidebar = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  console.log(data?.user?.image)

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={data.user.image ?? ''}
                referrerPolicy="no-referrer"
              />
            </Avatar>
            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-sm">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} /> inicio
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href={'/bookings'}>
            <CalendarIcon />
            Agendamentos
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOption.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  height={14}
                  width={14}
                  alt={option.title}
                />{' '}
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
      {data?.user && (
        <div className="flex flex-col gap-2 py-5">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={14} />
            Sair da conta
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default Sidebar
