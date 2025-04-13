import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import CategoryDivision from "./CategoryDivisor";

export function MenuItems({ items   , categories}) {

    items.sort((a,b)=>a.categoryId.localeCompare(b.categoryId))
    categories.sort((a,b)=>a.id.localeCompare(b.id))


  return (
    <div className="flex flex-col items-center gap-4 py-4 px-2 h-[600px] overflow-auto translate-y-2.5 no-scrollbar ">
      {items.map((item, index) => {

        let divisor =null;

        // Logica
      
        if(
          (item.categoryId !== items[index-1]?.categoryId 
          && index<items.length)
        )
        {
          const categoryName = categories?.find((item)=>{
            return item.id===items[index].categoryId
          })

           divisor = <CategoryDivision name={categoryName?.name}/> 
         
        }

        return (
          <div key={item.id}>
            
            {divisor}
          <Card  className="overflow-hidden w-[350px]">
            <div className="flex flex-row h-32 sm:h-40">
              <div className="relative w-1/3">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-amber-800">
                    ${item.price.toFixed(2)}
                  </p>
                  {item.tags && (
                    <div className="flex gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
          </div>
        );
      })}
    </div>
  );
}
