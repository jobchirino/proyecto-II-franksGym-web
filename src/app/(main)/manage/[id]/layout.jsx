import { ButtonBack } from "@/components/buttonBack"

const ManageLayout = ({ children }) => {
    return (
        <>
            <ButtonBack />
            {children}
        </>
    )
}

export default ManageLayout
