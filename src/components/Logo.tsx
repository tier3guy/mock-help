import Image from "next/image";
import LogoSvg from "@/assets/logo.svg";

export default function Logo(){
    return (
        <Image src={LogoSvg} alt="Logo" priority />
    )
}
