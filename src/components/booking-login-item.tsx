'use client'

import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TriangleAlertIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BookingsLoginAlert = () => {
  const [visible, setVisible] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      router.push('/')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  if (!visible) return null

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-5">
      <Alert className="max-w-md animate-in fade-in slide-in-from-top-2">
        <TriangleAlertIcon className="h-4 w-4" />
        <AlertTitle>Login necessário</AlertTitle>
        <AlertDescription>
          Você precisa estar logado para acessar seus agendamentos.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default BookingsLoginAlert
