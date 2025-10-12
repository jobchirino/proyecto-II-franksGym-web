import SessionProviderComponent from "@/components/sessionProvider";

export default function MainLayout({children}){
    return(
        <SessionProviderComponent>
            {children}
        </SessionProviderComponent>
    )
}