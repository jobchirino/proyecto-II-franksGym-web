import Header from "@/components/header";

export default function AuthLayout({ children }){
    return(
        <div className="w-full min-h-dvh flex flex-col md:flex-row">
            <Header isAuth={true}/>
            {children}
        </div>
    )
}