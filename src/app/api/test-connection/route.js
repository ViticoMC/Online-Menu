import { db } from '@vercel/postgres'; // Importa el cliente db
import { NextResponse } from 'next/server';

export async function GET() {
  let client;
  try {
    client = await db.connect(); // Conecta a la base de datos

    // Ejecuta una consulta de prueba
    const result = await client.sql`SELECT * FROM administradores LIMIT 1`;

    
    // Si llega aquí, la conexión funciona
    return NextResponse.json({
      data : result
    });

  } catch (error) {
    // Captura errores de conexión
    return NextResponse.json({
      status: "❌ Error de conexión",
      error: error.message,
    }, { status: 500 });

  } finally {
    // Libera la conexión (importante para evitar fugas)
    if (client) client.release();
  }
}