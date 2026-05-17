import { ButtonBack } from "@/components/buttonBack"

const EditLayout = ({ children }) => {
    return (
        <>
            <ButtonBack />
            {children}
        </>
    )
}

export default EditLayout
