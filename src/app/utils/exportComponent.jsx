import Footer from "../components/Footer";
import Contacto from "../components/Contacto";
import NotFound from "../components/NotFound";
import ProductSection from "../components/ProductSection";
import ServicesSection from "../components/ServicesSection";
import AggCard from "../components/AggCard";
import AgregarProducto from "../components/AggProduct";
import AgregarService from "../components/AggService";

export default function exportComponent() {
  return {
    Footer,
    Contacto,
    NotFound,
    ProductSection,
    ServicesSection,
    AggCard,
    AgregarProducto,
    AgregarService,
  };
}
