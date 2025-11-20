import UserForm from "@/components/userForm";
import { Roboto_Mono } from "next/font/google";
import { IoPersonOutline } from "react-icons/io5";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function NewAthleteFromMaage(){
    return(
        <div className="w-5/6 bg-[#323032] rounded-lg mt-3 py-3 flex flex-col gap-3">
            <header className="w-full pb-3 border-b-2 border-b-[#1B1C1F]">
                <h3 className={`${roboto.className} text-center text-2xl text-[#E50914]`}>Crear Usuario</h3>
            </header>
            <section className="w-full">
                <div className="w-full flex justify-center py-2">
                    <div className="bg-[#4C4C4C] p-5 rounded-full">
                        <IoPersonOutline color="#C23D3D" size={55}/>
                    </div>
                </div>
                <UserForm />                
            </section>
        </div>
    )
}