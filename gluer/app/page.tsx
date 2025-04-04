import GluerImage1 from "@/components/ui/image1";

export default async function Home() {
  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center font-sans">
          Somos una plataforma centralizada para ayudarte a hacer seguimiento a tus campañas publicitarias
        </h1>
        <GluerImage1 />
      </div>
    </main>
  );
}
