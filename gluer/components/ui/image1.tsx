import Image from "next/image";

export default function GluerImage1() {
  return (
    <Image
      src="/image1.PNG"
      alt="Imagen 1"
      width={500}
      height={1000}
      className="cursor-pointer"
    />
  );
}