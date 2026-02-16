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
            console.log('aqui response: ', response)
            if(!response.ok){
                setLoading(false)
                setError('Email o contraseña invalida')  
            } 

            if(response.ok) router.push('/')
        }).catch((error) => {
            setLoading(false)
            console.log('aquí error: ', error)
            setError("Error desconocido")
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
                    setError("Error desconocido")
                })
            }
        }).catch((err) => {
            setLoading(false)
            setError(err.response.data.error)
        })
  
    }

    return { handleLogicLogin, handleLogicRegister }
}