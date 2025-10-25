'use client'
import { clientsList } from "@/mocks/clients"
import { useState } from "react"
import { Roboto_Mono } from "next/font/google";

export const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function ClientsTable({data}){
    
    return(
        <table className="w-5/6 mt-10 border-separate border-spacing-0 border-3 border-[#4C4C4C] rounded-lg">
            <thead className={`${roboto.className}`}>
                <tr>
                    <th colSpan="2" className={`border-b-3 border-[#4C4C4C] text-2xl py-1.5 font-medium`}>Últimos Registros</th>
                </tr>
                <tr className="text-[#E50914]">
                    <th className="text-left pl-3 border-b-3 border-[#4C4C4C] font-normal py-1">Nombre atleta</th>
                    <th className="text-left border-b-3 border-[#4C4C4C] font-normal py-1">Estado</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length > 0? 
                        <>
                        {
                            data.map((client, idx) => (
                                <tr key={client.id}>
                                    <td 
                                        className={`py-2 text-left pl-3 
                                        ${data.length === 1 || data.length - idx === 1? '' : 'border-b-3 border-[#4C4C4C]'}`}
                                    >
                                            {client.fullName}
                                    </td>

                                    <td 
                                        className={`py-2 text-left 
                                        ${data.length === 1 || data.length - idx === 1? '' : 'border-b-3 border-[#4C4C4C]'}`}
                                    >
                                        <div className={`${client.isPaid? 'bg-[#44FF00]' : 'bg-[#E50914]'} w-5/6 md:w-2/6 text-center font-semibold py-1 px-2 rounded-lg text-black`}>
                                            {client.isPaid? 'Pago' : 'Pendiente'}
                                        </div>
                                    </td>
                                </tr>

                            ))
                        }
                        </>
                    :
                        <tr>
                          <td colSpan="2"  className="w-full text-center py-5 text-[#D0D0D0]">Aún no hay Registros</td>
                        </tr>
                }
            </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className="text-right py-3 pr-4"><a href="#" className="underline text-[#E50914]">Ver mas</a></td>
          </tr>
        </tfoot>
      </table>
    )
}