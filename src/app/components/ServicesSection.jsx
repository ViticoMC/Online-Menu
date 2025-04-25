import Image from "next/image";
import supabase from "@/lib/db";
import { useEffect, useState } from "react";

// import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash } from "lucide-react";
import { useAdminStore } from "@/storage/admin";
import getServices from "../utils/getServices";
import AggCard from "./AggCard";
import { useResetServices } from "@/storage/resetService";
import NotFound from "./NotFound";

export default function ServicesSection() {
  const { isAdmin } = useAdminStore();
  const [services, setServices] = useState([]);
  const { resetService, setResetService } = useResetServices();

  useEffect(() => {
    getServices().then((data) => setServices(data));
    console.log("Servicios reseteados");
  }, [resetService]);

  // useEffect(() => {
  //   const channels = supabase
  //     .channel("custom-all-channel")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "services" },
  //       (payload) => {
  //         console.log("Change received!", payload);
  //         getServices().then((data) => setServices(data));
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     channels.unsubscribe();
  //   };
  // }, []);

  async function deleteService({ id }) {
    console.log(id);
    const response = await supabase.from("services").delete().eq("id", id);
    setResetService({ id });
    console.log(response);
  }

  return (
    <section
      className="gap-4 max-w-7xl mx-auto"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      }}
    >
      {services?.length > 0 ? (
        services.map((service) => (
          <Card
            className="bg-black/50 border-pink-500/30 backdrop-blur-sm h-[500px]  flex flex-col justify-between"
            key={service.id}
          >
            <CardHeader>
              <CardTitle className="text-xl text-pink-400 mb-2 h-full">
                {service.name}
              </CardTitle>
              <div className="w-full mb-4 overflow-hidden rounded-md relative h-[200px]">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105 h-[200px] w-full"
                />
              </div>
              <p className="text-gray-400 max-w-200px">
                {service.description}
              </p>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
              <p className="text-lg font-bold text-pink-500">
                Precio : {service.price} - CUP
              </p>
              {isAdmin && (
                <button
                  className="ml-2 hover:text-pink-400 hover:bg-pink-500/10 cursor-pointer p-2 rounded-2xl"
                  onClick={() => {
                    console.log(service.id);
                    deleteService({ id: service.id });
                  }}
                >
                  <Trash />
                </button>
              )}
            </CardFooter>
          </Card>
        ))
      ) : !isAdmin ? (
        <NotFound name="piercings" />
      ) : null}
      {isAdmin ? <AggCard category={"services"} /> : null}
    </section>
  );
}
