'use client'

import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from './ui/dialog'

const SignOut = () => {
  const handleLogoutClick = () => signOut()
  return (
    <>
      <DialogHeader>
        <DialogTitle>Sair</DialogTitle>
        <DialogDescription>Deseja sair da plataforma?</DialogDescription>
      </DialogHeader>
      <div className="flex w-full gap-2">
        <DialogClose asChild>
          <Button variant="outline" className="w-full">
            Voltar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogoutClick}
          >
            Sair
          </Button>
        </DialogClose>
      </div>
    </>
  )
}

export default SignOut
