"use client";

import supabase from "@/lib/db";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetServices } from "@/storage/resetService";
import { useRouter } from "next/navigation";

export default function AgregarService() {
  const [formData, setFormData] = useState({
    name: "",
    descripción: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setResetService } = useResetServices();
  const router = useRouter();

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
    setImageFile("");
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setFormData({ name: "", descripción: "", price: "" });
    setImagePreview(null);

    const { error } = await supabase
      .from("services")
      .insert({
        image: imageFile,
        name: formData.name,
        price: formData.price,
        description: formData.descripción,
      });
    setResetService({ id: formData.name });

    setImageFile("");
    router.push("/#sevices");
  };

  return (
    <section>
      <Card className="w-full max-w-md bg-[#120824] border-[#2a1a3a] text-white fixed z-1000 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <CardHeader className="border-b border-[#2a1a3a] flex justify-between items-center">
          <CardTitle className="text-[#ff00ff]">
            Añadir Nuevo Servicio
          </CardTitle>

          <button
            onClick={() => {
              router.push("/#sevices");
            }}
          >
            <X className="h-7 w-7 rounded-full bg-[#ff00ff]/20 hover:bg-[#ff00ff]/40 border-none p-1 " />
          </button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Servicio
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-[#1a0e33] border-[#2a1a3a] focus:border-[#ff00ff] text-white"
                placeholder="Perforacion ..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripción" className="text-gray-300">
                Descripcion
              </Label>
              <textarea
                id="descripción"
                name="descripción"
                value={formData.descripción}
                onChange={handleInputChange}
                className="bg-[#1a0e33] border-[#2a1a3a] focus:border-[#ff00ff] text-white w-full min-h-[40px] p-1 indent-4"
                placeholder="Se realiza con..."
                required
                rows={10}
              ></textarea>
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
                      Haz clic para subir una Imagen
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
