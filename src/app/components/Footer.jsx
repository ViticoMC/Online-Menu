import ButtonAdmin from "./ButtonAdmin";
import Link from "next/link";
import { Lock  } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" px-4 bg-black border-t border-pink-500/30 flex flex-col justify-center ">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Tu Piercing Studio. Todos los derechos
          reservados.
        </p>
      </div>
      <div className="py-6 px-4 bg-black border-t border-pink-500/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mt-4">
            <Link href="/admin" passHref>
              <ButtonAdmin
                variant="outline"
                size="sm"
                className="border-pink-500/50 text-pink-500 hover:bg-pink-500/10 transition-colors flex flex-col justify-center items-center"
              >
                <Lock className="h-4 w-4 mr-2" />
                Acceso Administrador
              </ButtonAdmin>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
