'use client'
import { Trade_Winds } from "next/font/google"
import Image from "next/image";
import logo from '../../public/logo.svg'
import { IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";

const trade = Trade_Winds({
  subsets: ["latin"],
  weight: '400'
});

export default function Header({setNav}){
    const pathname = usePathname()
    const isAuth = pathname === '/auth' ? true : false 
    return(
        <header 
            className={`flex pr-2 ${isAuth? 'w-full md:flex-col md:h-dvh md:w-3/6 md:bg-[#323032] md:items-center md:p-0 md:justify-around': 'w-full md:justify-end'} `}
        >
            <div className={`w-[65%] flex justify-center gap-3 pt-7 ${isAuth? '' : 'md:w-auto md:items-center md:pt-0'}`}>
                {
                    pathname != '/auth'?
                        <div className="md:absolute md:top-8 md:left-3 desktop:hidden z-0">
                            <IoMenu size={40} onClick={() => setNav(true)}/> 
                        </div> : ''
                }
                <h1 className={`${trade.className} ${isAuth? 'text-[2rem] md:text-8xl desktop:px-10 md:static md:top-0 md:text-center' : 'text-[1.8rem] md:text-5xl'} text-[#E50914] `}>Frank's Gym</h1> 
            </div>
            <div className={`${isAuth? 'w-[35%] h-full pt-0.5 flex justify-end md:h-3/6 md:w-full md:justify-center md:items-center': 'w-[35%] md:w-auto'}`}>
                <Image 
                    src={logo}
                    alt="Logo"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`${isAuth? 'md:size-96' : ''}`}
                />

            </div>
        </header>
    )
}//md:flex-col md:h-dvh md:w-3/6 md:bg-[#323032] md:items-center md:p-0 md:justify-around