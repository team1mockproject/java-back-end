import { Outlet } from "react-router-dom"
import ClientHeader from "../components/client-header/ClientHeader"

const Client = () => {
    return (
        <>
            <ClientHeader />
            <Outlet />
        </>
    )
}
export default Client