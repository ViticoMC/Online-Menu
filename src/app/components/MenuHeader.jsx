import { Coffee } from "lucide-react"

export function MenuHeader({ cafeName }) {
  return (
    <header className="sticky top-0 z-10 bg-amber-900 text-amber-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <Coffee className="mr-2 h-6 w-6" />
        <h1 className="text-xl font-bold">{cafeName}</h1>
      </div>
    </header>
  )
}

