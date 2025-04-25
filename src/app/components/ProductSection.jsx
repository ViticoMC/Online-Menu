import Image from "next/image";
import supabase from "@/lib/db";

import { Trash } from "lucide-react";
import AggCard from "./AggCard";
import NotFound from "./NotFound";
import { useAdminStore } from "@/storage/admin";
import { useResetProduct } from "@/storage/resetProduct";
import { useEffect , useState } from "react";
import getProducts from "../utils/getProduct";

export default function ProductgetProductsection() {
  const { isAdmin } = useAdminStore();
  const { resetProduct, setResetProduct } = useResetProduct();

  async function deleteProduct({ id }) {
    console.log(id);
    const response = await supabase.from("products").delete().eq("id", id);
    setResetProduct({ id });
    console.log(response);
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("resetProduct")
    getProducts().then((data) => setProducts(data));
  }, [resetProduct]);



  return (
    <section
      className="gap-4  mx-auto max-w-[100vw]"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      }}

    >
      {products?.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-black/50 p-2 border border-pink-500/30 rounded-lg overflow-hidden backdrop-blur-sm  min-h-[380px] h-[500px] flex flex-col justify-between"
          >
            <div className="relative h-[350px] w-full overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-pink-400 mb-1">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm mb-2">{product.material}</p>
              <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-pink-500">
                Precio : {product.price} - CUP
              </p>
                <span className="flex items-center space-x-2">
                  {isAdmin && (
                    <button
                      className="ml-2 hover:text-pink-400 hover:bg-pink-500/10 cursor-pointer p-2 rounded-2xl"
                      onClick={() => {
                        deleteProduct({ id: product.id });
                      }}
                    >
                      <Trash />
                    </button>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : !isAdmin ? (
        <NotFound name="piercings" />
      ) : null}
      {isAdmin ? <AggCard category={"products"} /> : null}
    </section>
  );
}
