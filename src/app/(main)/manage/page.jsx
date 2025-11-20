import Link from "next/link"

export default async function ManageUsers(){
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`)
    const users = await res.json()
    console.log('aquí los users: ', users)
    return(
        <div className="w-5/6 flex item-center mt-6 flex-col">
            <ul className="w-5/6 max-h-[45dvh] border-2 border-[#4C4C4C] rounded-lg overflow-y-auto scroll-style">
                {
                    users.users.length > 0?
                    users.users.map((item, idx) => (
                        <li 
                            key={item.id} 
                            className={`${users.users.length - 1 === idx? '' : 'border-b-2 border-[#4C4C4C]'} 
                            py-3 hover:bg-[#4C4C4C] cursor-pointer transition-colors 
                            duration-300 px-4`}
                        >
                            <Link href={`/manage/${item.id}`} className="flex items-center gap-3">
                                <div className="px-3 py-2 rounded-full bg-[#D80948]">
                                    <p className="text-2xl font-semibold text-black ">{item.name[0].toUpperCase()}</p>
                                </div>
                                <h3 className="text-lg">{item.name}</h3>
                            </Link>
                        </li>
                    )) : 
                    <li className="py-3 pl-3">
                        Aún no hay usuarios que gestionar...
                    </li>
                }
            </ul>
            <section className="w-5/6 flex justify-end py-4">
                <Link href={'/manage/newAthlete'} className="bg-[#C23D3D] px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#842E2E]">
                    Crear nuevo usuario
                </Link>
            </section>
        </div>
    )
}