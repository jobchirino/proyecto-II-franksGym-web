export const DashboardCard = ({ text, data, icon }) => {
    return (
        <div className="flex flex-col bg-[#323032] p-4 mt-3 rounded-lg w-[200px] gap-2 shadow-xl relative">
            <h2 className="text-xl text-[#D0D0D0] text-start">{text}</h2>
            <p className="text-center text-4xl font-bold">{Number(data)}</p>
            <p className="absolute top-0 right-0 m-2">{icon}</p>
        </div>
    )
}
