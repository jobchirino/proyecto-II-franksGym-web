'use client'

export default function CloseModal({ setError }){
    const handleClick = (e) => {
        const dialog  = e.target.closest('dialog')
        if(dialog){
            dialog.classList.add('closing')
            console.log('aquí las clases: ', dialog.classList)
            setTimeout(() => {
                dialog.close()
                dialog.classList.remove('closing')
            }, 210);
        } 
        setError?.('')
    }
    return(
        <button 
            type="button"
            onClick={handleClick}
            className="cursor-pointer bg-[#C23D3D] px-3 py-1 rounded-md shadow-lg shadow-black"
        >
            Aceptar
        </button>

    )
}
