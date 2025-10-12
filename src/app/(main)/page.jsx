import Header from "@/components/header";

export default function Home(){
  return(
    <div className="w-full h-dvh flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <h2>Home</h2>
      </div>
    </div>
  )
}