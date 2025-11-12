import axios from "axios"
import { signIn } from "next-auth/react"

export default function useAuth(setLoading, setError, router){
    const handleLogicLogin = (e) => {
        e.preventDefault()
        setError('')
        
        setLoading(true)
        signIn('credentials', {
            redirect: false,
            email: e.target.email.value,
            password: e.target.password.value
        }).then((response) => {
            console.log('aqui response', response)
            if(!response.ok && response.error === 'CredentialsSignin'){
                setLoading(false)
                setError({error: 'Email o contraseña invalida'})  
            } 
            if(response.ok) router.push('/')
        }).catch((error) => {
            setLoading(false)
            console.log('aquí error: ', error)
            setError({error: "Error desconocido"})
        })
    }

    const handleLogicRegister = (e) => {
        e.preventDefault()
        setError('')
        const formData = new FormData
        formData.append('email', e.target.email.value)
        formData.append('password', e.target.password.value)
        formData.append('confirmPassword', e.target.confirmPassword.value)
        formData.append('name', e.target.name.value)
        formData.append('isFirst', 'true')
        console.log('registrando...')
        
        setLoading(true)
        axios.post('/api/users/registers', formData)
        .then((res) => {
            if(res.status === 201){
                signIn('credentials', {
                    redirect: false,
                    email: e.target.email.value,
                    password: e.target.password.value
                }).then((signInResponse) => {
                    if(signInResponse.ok) router.push('/')
                }).catch(() => {
                    setLoading(false)
                    setError({error: "Error desconocido"})
                })
            }
        }).catch((err) => {
            setLoading(false)
            if(Array.isArray(err.response.data.error)) setError(err.response.data.error)
            if(err.response.status === 403) setError({error: err.response.data.error})
            if(err.response.status === 500) setError({error: "Error desconocido"})
        })
  
    }

    return { handleLogicLogin, handleLogicRegister }
}