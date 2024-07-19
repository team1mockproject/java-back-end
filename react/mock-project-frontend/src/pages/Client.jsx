import { Outlet } from "react-router-dom"
import ClientHeader from "../components/client-header"
import { useContext } from "react"
import ModalStateContext from "../context/modal-state-context"

const Client = () => {
    const { modalState } = useContext(ModalStateContext)
    return (
        <>
            <ClientHeader />
            <div className={`${modalState ? 'h-[calc(100vh-70px)] overflow-hidden' : ''}`}>
                <Outlet />
            </div>
        </>
    )
}
export default Client