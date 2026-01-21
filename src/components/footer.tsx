import { Card, CardContent } from './ui/card'

const Footer = () => {
  return (
    <footer>
      <Card className="px-5 py-4">
        <CardContent>
          <p className="text-sm text-gray-400">
            &copy; 2025 Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
