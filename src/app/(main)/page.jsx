'use client'
import ClientsTable from "@/components/clientsTable";
import Loader from "@/components/loader";
import axios from "axios";
import { Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";

export const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function Home(){
  const [athlete, setAthletes] = useState('')
  const [loading, setLoading]  = useState(true)
  console.log('aquí los atletas', athlete)
  useEffect(() => {
    axios.get('/api/athletes')
    .then((response) => {
       setAthletes(response.data)
    })
    .catch((error) => {
      console.log(error)
    }).finally(() => setLoading(false))
  }, [])
  return(
    <main className="flex-grow flex flex-col items-center pb-4 overflow-y-auto">
      <h2 className={`${roboto.className} text-3xl font-semibold self-start pl-10`} >Inicio</h2>
      {
        loading? 
        <div className="flex flex-grow justify-center items-center">
          <Loader />
        </div> :
        <>
        <ClientsTable data={athlete} />
        {
          athlete.length > 0? '':
          <div className="w-5/6 flex justify-center items-center flex-col desktop:items-end">
            <button className="bg-[#C23D3D] px-3 py-2 mt-3 cursor-pointer rounded-lg transition-colors duration-300 hover:bg-[#842E2E]">
              Registra tu Primer Atleta
            </button>
          </div>
        }
        </>
      }
    </main>
    
  )
}
