import { ButtonBack } from "@/components/buttonBack"

const newUserLayout = ({ children }) => {
    return (
        <>
            <ButtonBack />
            {children}
        </>
    )
}

export default newUserLayout
