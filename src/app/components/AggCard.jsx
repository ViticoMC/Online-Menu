"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AggCard({category}) {

    const router = useRouter()

    function whatCategory(){
      if(category==='products')router.push('/admin/products')
        else router.push('/admin/services')
    }
  
  return (
    <Card className="w-full  bg-black/50 border-[#2a1a3a] text-white hover:border-[#ff00ff]/30 transition-all duration-300 h-[500px]">
      <CardContent className="p-0 relative flex flex-col items-center justify-center h-full ">
        <div className="h-[200px] flex items-center justify-center  w-full">
          <button onClick={whatCategory}>
          <div className="rounded-full bg-[#ff00ff]/20 p-6 hover:scale-105 cursor-pointer transition-all duration-300 ">
            <Plus className="h-12 w-12 text-[#ff00ff] " />
          </div>
          </button>
        </div>
      </CardContent>
      
    </Card>
  )
}
