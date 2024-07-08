import { Link } from "react-router-dom"
import Logo from "../../assets/logo-1.jfif"
const ClientHeader = () => {
    return (
        <ul className="flex justify-between items-center h-[70px] px-4 bg-[var(--color-primary)]">
            <li>
                <img
                    className="h-[70px]"
                    src={Logo}
                    alt="Logo"
                />
            </li>
            <li>
                <Link
                    className="bg-white px-8 py-2 rounded-full font-medium text-[var(--color-primary)] border border-[var(--color-primary)] transition-all
                    hover:bg-transparent hover:text-white border-white"
                    to={"/login"}
                >
                    Login
                </Link>
            </li>
        </ul>
    )
}
export default ClientHeader