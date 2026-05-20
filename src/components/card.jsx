export const DashboardCard = ({ text, data, icon }) => {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-[#4C4C4C] bg-[#323032] p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#842E2E]">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#C23D3D]"></div>
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-3">
                    <h2 className="text-sm uppercase tracking-[0.2em] text-[#D0D0D0]">{text}</h2>
                    <p className="text-4xl font-bold leading-none">{Number(data)}</p>
                </div>
                <div className="rounded-xl bg-[#1B1C1F] p-3 text-[#E50914] shadow-lg shadow-black/30">
                    {icon}
                </div>
            </div>
        </div>
    )
}
