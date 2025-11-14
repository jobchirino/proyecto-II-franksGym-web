import AthleteForm from "@/components/athleteForm"
import { getAthlete } from "../layout"

export default async function EditAthlete({params}){
    const { id } = params
    const athlete = await getAthlete(id)
    return(
        <AthleteForm defaultValue={athlete} id={id} edit={true}/>
    )
}