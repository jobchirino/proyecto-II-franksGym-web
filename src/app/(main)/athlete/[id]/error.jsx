'use client'

import ModalError from "@/components/modalError"

export default function Error({error}){
    const parsedError = JSON.parse(error.message) || {error: "error desconocido"}
    console.log(parsedError)
    console.log('aquí el error desde la pag: ', parsedError)
    return(
        <ModalError error={parsedError}/>
    )
}