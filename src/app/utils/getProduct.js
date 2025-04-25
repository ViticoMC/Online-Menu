import supabase from "@/lib/db";

export default async function getProducts() {
  const { data, error } = await supabase.from("products").select();
  const products = data;
  return products;
}
