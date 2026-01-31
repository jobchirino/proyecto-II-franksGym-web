import UserDetailComponent from "@/components/userDetail";

export default async function UserDetail({params}){
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)
    const user = await res.json()
    console.log(user)
    return(
        <UserDetailComponent data={user.user} isManage={true}/>
    )
}