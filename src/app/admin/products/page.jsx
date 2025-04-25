"use client";

import { useState } from "react";
import { useAdminStore } from "@/storage/admin";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/db";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetProduct } from "@/storage/resetProduct";

export default function AgregarProducto() {
  const [formData, setFormData] = useState({
    name: "",
    material: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const { setIsAggProduct } = useAdminStore();
  const { setResetProduct } = useResetProduct();
  const router = useRouter();

  const [imageFile, setImageFile] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const presetName = "yusle-piercing";
  const cloudName = "dqthqbwff";

  const handleImageChange = async (e) => {
    const data = new FormData();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      data.append("file", file);
      data.append("upload_preset", presetName);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result);
      };
      reader.readAsDataURL(file);

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        console.log("response", response);

        const result = await response.json();
        console.log("result", result);
        setImageFile(result.secure_url);
        const interval = setInterval(() => {
          setLoading(false);
          clearInterval(interval);
        }, 300);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const clearImage = () => {
    setImageFile('');
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    console.log("evento", e);

    setFormData({ name: "", material: "", price: "" });
    setImagePreview(null);
    console.log("iamgeURL", imageFile);

    const { error } = await supabase
      .from("products")
      .insert({
        name: formData.name,
        price: formData.price,
        material: formData.material,
        image: imageFile,
      });

    router.push("/#products");
    setImageFile('')
    setResetProduct({ id: formData.name });
  };

  return (
    <section className="h-auto min-h-screen scroll-auto flex flex-col items-center justify-center">
      <Card className="w-full max-w-md bg-[#120824] border-[#2a1a3a] text-white">
        <CardHeader className="border-b border-[#2a1a3a] flex justify-between items-center">
          <CardTitle className="text-[#ff00ff]">
            Añadir Nuevo Piercing
          </CardTitle>

          <button
            onClick={() => {
              router.push('/#products')
            }}
          >
            <X className="h-7 w-7 rounded-full bg-[#ff00ff]/20 hover:bg-[#ff00ff]/40 border-none p-1 " />
          </button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-[#1a0e33] border-[#2a1a3a] focus:border-[#ff00ff] text-white"
                placeholder="Aro Nasal Simple"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="material" className="text-gray-300">
                Material
              </Label>
              <Input
                id="material"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                className="bg-[#1a0e33] border-[#2a1a3a] focus:border-[#ff00ff] text-white"
                placeholder="Acero quirúrgico"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-300">
                Precio
              </Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="bg-[#1a0e33] border-[#2a1a3a] focus:border-[#ff00ff] text-white"
                placeholder="12,99"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-300">
                Imagen
              </Label>
              {!imagePreview ? (
                <div className="border-2 mb-4 border-dashed border-[#2a1a3a] rounded-md p-6 flex flex-col items-center justify-center bg-[#1a0e33] cursor-pointer hover:border-[#ff00ff]/50 transition-colors">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="image"
                    className="cursor-pointer flex flex-col items-center "
                  >
                    <Upload className="h-10 w-10 text-[#ff00ff]/70 mb-2" />
                    <span className="text-gray-400 text-sm ">
                      Haz clic para subir imagen
                    </span>
                  </Label>
                </div>
              ) : (
                <div className="relative mb-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded-md border border-[#2a1a3a]"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-[#ff00ff]/20 hover:bg-[#ff00ff]/40 border-none"
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="border-t border-[#2a1a3a] pt-4">
            <Button
              type="submit"
              className={`w-full bg-[#ff00ff]/80 hover:bg-[#ff00ff] text-white ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              Guardar Piercing
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
