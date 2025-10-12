import { Trade_Winds } from "next/font/google"
import Image from "next/image";
import logo from '../../public/logo.svg'

const trade = Trade_Winds({
  subsets: ["latin"],
  weight: '400'
});

export default function Header(){
    return(
        <header 
            className="w-full h-[20%] flex pl-3 pr-2 justify-end relative md:flex-col md:h-dvh md:w-3/6 md:bg-[#323032] md:items-center md:p-0 md:justify-around"
        >
            <h1 className={`${trade.className} absolute top-7 left-4 text-[1.8rem] text-[#E50914] md:text-8xl desktop:px-10 md:static md:top-0 md:text-center`}>Frank's Gym</h1>
            <div className="w-[45%] h-full pt-0.5 flex justify-end md:h-3/6 md:w-full md:justify-center md:items-center">
                <Image 
                    src={logo}
                    alt="Logo"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="md:size-96"
                />

            </div>
        </header>
    )
}