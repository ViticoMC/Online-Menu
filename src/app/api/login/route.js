import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import supabase from "@/lib/db";


export async function POST(req) {
  const { username, password } = await req.json();

  // 1. Obtener admin desde Supabase
  const { data } = await supabase
    .from("administradores")
    .select();

  // 2. Validación simple (solo para pruebas)
  if (data[0]?.contrasena_hash !== password || data[0]?.usuario !== username) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  // 3. Generar token en el servidor
  const token = jwt.sign(
    { user: username },
    process.env.JWT_SECRET || 'clave_temporal',
    { expiresIn: '7d' }
  );

  // 4. Enviar respuesta al cliente
  return NextResponse.json({ token });
}