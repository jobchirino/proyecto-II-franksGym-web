import axios from "axios";

export default function useNewAthlete(setLoading, setError){
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData
        formData.append('CI', e.target.CI.value)
        formData.append('fullName', e.target.fullName.value)
        formData.append('addres', e.target.addres.value)
        formData.append('phoneNumber', e.target.phoneNumber.value)
        formData.append('emergencyPhoneNumber', e.target.emergencyPhoneNumber.value)
        formData.append('email', e.target.email.value)
        formData.append('isPaid', 'true')
        formData.append('membershipType', e.target.membershipType.value)

        axios.post('/api/athletes', formData)
        .then((response) => {
            alert("Atleta creado con éxito")
            console.log(response.data)
        }).catch((error) => {
            if(Array.isArray(error.response.data.error)) setError(error.response.data.error)
            if(error.response.status === 409) setError({error: error.response.data.error})
            if(error.response.status === 500) setError({error: "Error descnonocido"})
        }).finally(() => setLoading(false)) 
        
    }

    return { handleSubmit }
}