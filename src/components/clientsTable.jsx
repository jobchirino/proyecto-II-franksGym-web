import { Roboto_Mono } from "next/font/google";
import Link from "next/link";


export const roboto = Roboto_Mono({
    subsets: ["latin"],
    weight: '400'
});

const RenderItem = ({ client, idx, functional, data }) => (
    <tr className={`${functional ? 'cursor-pointer transition-colors duration-300 hover:bg-[#4C4C4C] relative' : ''}`}>
        <td
            className={`py-2 text-left pl-3 text-sm relative ${functional ? 'active:underline' : ''}
            ${data.length === 1 || data.length - idx === 1 ? '' : 'border-b-3 border-[#4C4C4C]'}`}
        >
            {
                functional ?
                    <Link href={`/athlete/${client.id}`} className="absolute top-0 left-0 w-full h-full z-10" aria-label="Ver Detalles"></Link> : ''
            }
            <span role="text" aria-label="Nombre">{client.fullName}</span> <br />
            <span aria-label="Cédula">{client.CI}</span>
        </td>

        <td

            className={`py-2 text-left 
            ${data.length === 1 || data.length - idx === 1 ? '' : 'border-b-3 border-[#4C4C4C]'}`}
        >
            {
                functional ?
                    <Link href={`/athlete/${client.id}`} className="absolute top-0 left-0 w-full h-full z-10" aria-label="Ver Detalles"></Link> : ''
            }
            <div aria-label="Estatus" className={`${client.isPaid ? 'bg-[#44FF00]' : 'bg-[#E50914]'} w-5/6 md:w-2/6 text-center font-semibold py-1 px-2 rounded-lg text-black`}>
                {client.isPaid ? 'Pago' : 'Pendiente'}
            </div>
        </td>
    </tr>
)

export default async function ClientsTable({ dataPromise, functional }) {
    const { data } = await dataPromise
    return (
        <>
            <table className="w-5/6 mt-6 border-separate border-spacing-0 border-3 border-[#4C4C4C] rounded-lg">
                <thead className={`${roboto.className}`}>
                    <tr>
                        <th colSpan="2" className={`border-b-3 border-[#4C4C4C] text-2xl py-1.5 font-medium`}>
                            {functional ? 'Atletas Registrados' : 'Últimos Registros'}
                        </th>
                    </tr>
                    <tr className="text-[#E50914]">
                        <th className="text-left pl-3 border-b-3 border-[#4C4C4C] font-normal py-1">Nombre atleta</th>
                        <th className="text-left border-b-3 border-[#4C4C4C] font-normal py-1">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                            <>
                                {
                                    data.map((client, idx) => (
                                        <RenderItem key={client.id} client={client} idx={idx} functional={functional} data={data} />
                                    ))
                                }
                            </>
                            :
                            <tr>
                                <td colSpan="2" className="w-full text-center py-5 text-[#D0D0D0]">Aún no hay Registros</td>
                            </tr>
                    }

                </tbody>
                {
                    functional ? '' :
                        <tfoot>
                            <tr>
                                <td colSpan="2" className="text-right py-3 pr-4">
                                    <Link href="/athlete" className="hover:underline active:text-[#e45960] text-[#E50914]">
                                        Ver mas
                                    </Link>
                                </td>
                            </tr>
                        </tfoot>
                }
            </table>
        </>

    )
}
