"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAdminStore } from "@/storage/admin";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import exportComponent from "./utils/exportComponent";

export default function Home() {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  const {
    Footer,
    Contacto,
    NotFound,
    ProductSection,
    ServicesSection,
    AggCard,
    AgregarProducto,
    AgregarService,
  } = exportComponent();

  const { isAdmin, setIsAdmin, isAggProduct, isAggService } = useAdminStore();

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    try {
      const token =
        localStorage.getItem("adminToken") ||
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("adminToken="))
          ?.split("=")[1];

      if (token) {
        setIsAdmin(true);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {isAggProduct && <AgregarProducto />}
      {isAggService && <AgregarService />}

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/walper2.png"
            alt="Fondo estético de estudio de piercings"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
          >
            Arte en tu Piel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Expertos en perforaciones corporales con estilo único y
            personalizado
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-[130px]"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              onClick={() => scrollToSection(servicesRef)}
            >
              Ver Servicios
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-pink-500 text-pink-500 hover:bg-pink-500/10"
              onClick={() => scrollToSection(contactRef)}
            >
              Contáctanos
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          onClick={() => scrollToSection(servicesRef)}
        >
          <ChevronDown className="h-10 w-10 text-pink-500" />
        </motion.div>
      </motion.div>

      {/* Services Section */}
      <div
        ref={servicesRef}
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-purple-950 "
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          Nuestros Servicios
        </h2>
        <ServicesSection />
      </div>

      {/* Products Section */}
      <div
        ref={productsRef}
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-purple-950 to-black"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Piercings a la Venta
        </h2>
        <div>
          <ProductSection />
        </div>
      </div>

      <Contacto ref={contactRef} />
      <Footer />
    </main>
  );
}
