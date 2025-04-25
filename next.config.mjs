/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'res.cloudinary.com', // Dominio principal de Cloudinary
        'cloudinary.com'      // Opcional: para enlaces alternativos
      ],
    },
  };
  
  export default nextConfig;