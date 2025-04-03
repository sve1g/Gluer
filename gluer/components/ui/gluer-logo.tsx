import Image from "next/image";

export default function GluerLogo() {
  return (
    <Image
      src="/logo.PNG"
      alt="Gluer Project Logo"
      width={120}
      height={40}
      className="cursor-pointer"
    />
  );
}