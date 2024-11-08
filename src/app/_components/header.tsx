import { api } from "@/trpc/server";
import Image from "next/image"
import Link from "next/link"
import Cart from "./cart";

export async function Header() {
    const username = 'BuffoonSpoon';

    const getUsername = await api.auth.getUsername();

    


    return (
        <div className="flex justify-between items-center px-[4em] w-full h-[108px] border-b border-b-custom-gray-medium bg-custom-gray-black sticky top-0">
            {/* Left Links Section */}
            <div className="flex gap-8 flex-1">
                <HeaderLink url={'/'} title={'Home'} />
                <HeaderLink url={'/'} title={'Catalog'} />
                <HeaderLink url={'/'} title={'Compatability'} />
                <HeaderLink url={'/'} title={'FAQ'} />
            </div>
            
            {/* Center Logo Section */}
            <div className="h-[108px] flex items-center justify-center flex-1">
                <Image src={'/logo/longnobg.png'} width="1102" height="404" alt="Logo" className="h-[65px] w-fit" />
            </div>
            
            {/* Right Links/Other Items Section */}
            <div className="flex gap-4 flex-1 justify-end">
                <Link href={'/download'}><button className="font-mc bg-custom-bpink text-white h-[55px] w-[250px] text-lg">DOWNLOAD</button></Link>
                <div className=" border-custom-gray-dark h-[55px] w-[55px] flex items-center">
                    <Link href={'/account'}><Image src={`https://minotar.net/helm/${getUsername.username}/100.png`} width="55" height="55" alt={``} /></Link>
                </div>
                <div className="h-[55px] w-[55px] cursor-pointer">
                    <Cart />
                </div>
            </div>
        </div>
    )
}

export async function LandingHeader() {
    return (
        <div className="w-full min-h-[108px] bg-custom-gray-black sticky top-0">

        </div>
    ) 
}

interface HeaderLinkProps {
    url: string;
    title: string;
  }
  
  function HeaderLink({ url, title }: HeaderLinkProps) {
    return (
      <Link href={url} className="text-custom-gray-light hover:text-white font-basically transition-all duratin-200">{title}</Link>
    );
  }