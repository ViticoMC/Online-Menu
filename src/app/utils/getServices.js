import supabase from "@/lib/db";

export default async function getServices() {
  const { data, error } = await supabase.from("services").select();
  const services = data;
  return services;
}
