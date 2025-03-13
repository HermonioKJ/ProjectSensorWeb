import { roboto } from "@/components/shared/fonts";
import { Info } from "lucide-react";

export default function Settings() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[100%] w-full">
      <h1 className={`${roboto.className} font-bold text-xl md:text-2xl mb-5`}>
        Settings
      </h1>
      <div className="flex flex-col justify-center items-center pb-20 text-center">
        <Info height={100} width={100} />
        <p className="font-bold text-3xl mb-5 mt-10">Under construction</p>
        <p>This website page is still under development.</p>
        <a href="/dashboard" className="underline">Go back to dashboard</a>
      </div>
    </main>
  );
}