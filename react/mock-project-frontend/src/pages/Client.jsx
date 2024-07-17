import { Outlet } from "react-router-dom"
import ClientHeader from "../components/client-header"
import ClientFooter from "../components/client-footer/ClientFooter"

const Client = () => {
    return (
        <>
            <ClientHeader />
            <Outlet />
            <ClientFooter />
        </>
    )
}
export default Client