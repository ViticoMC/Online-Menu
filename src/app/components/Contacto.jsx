import {  Instagram, Mail, MapPin, Phone, PhoneIcon as WhatsApp} from 'lucide-react'



export default function Contacto() {
  return (
    <div className="py-20 px-4 md:px-8 bg-black flex flex-col justify-center ">
            <div className="max-w-5xl mx-auto ">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Contáctanos</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-pink-500/20 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Teléfono(solo llamadas)</h3>
                      <p className="text-gray-400">+53 55938566</p>
                    </div>
                  </div>
                  <a href="https://wa.me/53558702" target="_blank" className='flex items-center space-x-4'>
                    <div className="bg-pink-500/20 p-3 rounded-full">
                      <WhatsApp className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">WhatsApp</h3>
                      <p className="text-gray-400">+53 53558702</p>
                    </div>
                  </a>
                  <div className="flex items-center space-x-4">
                    <div className="bg-pink-500/20 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Dirección</h3>
                      <p className="text-gray-400">Las Margaritas calle Tecera / Cuata y Quinta #22</p>
                    </div>
                  </div>
                                  </div>
              
            </div>
          </div>
  )}