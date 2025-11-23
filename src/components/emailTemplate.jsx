export default function EmailTemplate({ name, token }){
    return (
        <div>
            <h1>Bienvenido {name}</h1>
            <p>Aquí tienes el enlace para recuperar tu contraseña</p>
            <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password/${token}`}>
                Restablecer contraseña
            </a>
        </div>
    )
}