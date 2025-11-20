import { Train_One } from "next/font/google"
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link"
import Image from "next/image";
import notFoundImage from "../../public/notFoundImage.svg"

const trainOne = Train_One({
    subsets: ["latin"],
    weight: '400'
})



export default function NotFound(){
    return(
        <div className="w-full h-dvh flex flex-col items-center">
            <header className="w-full h-1/6 desktop:h-2/6 px-4 flex items-end">
                <div className="w-full flex items-center">
                    <div className="flex-grow rounded-4xl border-t-4 border-white"></div>
                    <p className="text-4xl flex-shrink mx-4">
                        Opps!
                    </p>
                    <div className="flex-grow rounded-4xl border-t-4 border-white"></div>    
                </div>
            </header>
            <section className="w-full flex justify-center py-10 gap-3 flex-col items-center">
                <h1 className={`text-8xl ${trainOne.className} text-[#E50914]`}>404</h1>
                <p className="font-semibold">Sitio No Disponible</p>
            </section>
            <Image 
                src={notFoundImage}
                alt="Imagen 404"
                unoptimized={true}
                className="w-60 h-60 desktop:w-96 desktop:h-96 desktop:absolute desktop:top-2/6 desktop:right-0"
            />
            <section className="flex-grow flex justify-center items-center">
                <Link href={'/'} className="flex gap-2 items-center">
                    <FaArrowLeft size={20}/>
                    Volver al Inicio
                </Link>
            </section>
        </div>
    )
}