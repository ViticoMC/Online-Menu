"use client";
import { useAdminStore } from "@/storage/admin";
import { useRouter } from "next/navigation";



import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const { setIsAdmin, isAdmin } = useAdminStore();

  useEffect(() => {
    setError(false);
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('adminToken', token); // Guardar en cliente
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }

      router.push("/");

    // } else {
    //   setError(true);
    // }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-pink-500 hover:text-pink-400 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la página principal
        </Link>

        <Card className="border-pink-500/30 bg-black/70 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-white">
              Acceso Administrador
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Ingresa tus credenciales para acceder al panel de administración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-pink-500" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 px-4 py-2 bg-black/50 border border-pink-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                    placeholder="Nombre de usuario"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-pink-500" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 px-4 py-2 bg-black/50 border border-pink-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                    placeholder="Contraseña"
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    Contraseña o usuario incorrectos
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              ¿Olvidaste tu contraseña? Contacta al administrador del sistema
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
