import UserDetailComponent from "@/components/userDetail";

export default async function UserDetail({params}){
    const { id } = params
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}`)
    const user = await res.json()
    console.log(user)
    return(
        <UserDetailComponent data={user.user} isManage={true}/>
    )
}