import Header from "@/components/header";
import Input from "@/components/input";
import { robotoAuth } from "../page";

export default function ForgotPassword(){
    return(
        <div className="w-full min-h-dvh flex flex-col md:flex-row">
            <Header isAuth={true}/>
        
                    <div className="flex-grow flex flex-col items-center gap-2 mb-10 md:justify-center md:mb-0">
                        <h2 className={`${robotoAuth.className} text-2xl w-3/6 text-center`}>
                            Ingresa tu correo registrado para recuperar tu contraseña
                        </h2>
                        <div className="w-5/6 bg-[#323032] py-7 rounded-lg flex flex-col items-center gap-6 shadow-black shadow-xl desktop:w-3/6 2xl:max-w-2/6 ">
                            <form className="w-[90%] flex flex-col gap-4 px-5 items-center">
                            <div className={`w-full flex flex-col gap-3 items-center`}>
                                <Input 
                                    label={"Correo electrónico"}
                                    id={'email'}
                                    type={'email'}
                                    placeholder={'jhon@email.com'} 
                                />
                            </div>

                            </form>
                        </div>

                    </div>
                    

        </div>
    )
}