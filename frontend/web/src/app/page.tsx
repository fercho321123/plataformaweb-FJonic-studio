import { redirect } from "next/navigation";

export default function Home() {
  // Redirige automáticamente al panel de acceso
  redirect("/login");
}