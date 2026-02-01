import { prisma } from "@/app/libs/prisma";
import UserDetailComponent from "@/components/userDetail";

export default async function UserDetail({params}){
    const { id } = await params
    const user = await prisma.user.findUnique({
        where: { id: id }
    })
    console.log(user)
    return(
        <UserDetailComponent data={user} isManage={true}/>
    )
}