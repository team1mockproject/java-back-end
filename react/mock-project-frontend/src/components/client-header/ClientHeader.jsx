import { Link } from "react-router-dom"
import Logo from "../../assets/logo-1.jfif"
import { ShoppingCartOutlined, BellOutlined } from '@ant-design/icons';
const ClientHeader = () => {
    return (
        <div className="w-full max-w-full h-[70px] flex justify-center px-4 bg-[var(--color-primary)]">
            <ul className="w-full max-w-[1035px] flex justify-between items-center">
                <li>
                    <div className="flex items-center space-x-6">
                        <img
                            className="h-[70px]"
                            src={Logo}
                            alt="Logo"
                        />
                        <Link to={"/Home"} className="font-semibold text-gl text-white hover:text-blue-500 transition-colors duration-300">Home</Link>
                        <Link to={"/News"} className="font-semibold text-gl text-white hover:text-blue-500 transition-colors duration-300">News</Link>
                        <Link to={"/Contact"} className="font-semibold text-gl text-white hover:text-blue-500 transition-colors duration-300">Contact</Link>
                        <Link to={"/MyActivity"} className="font-semibold text-gl text-white hover:text-blue-500 transition-colors duration-300">MyActivity</Link>
                    </div>
                </li>
                <li>
                    <div className="flex items-center space-x-6">
                        <Link to={"/order"} className="font-semibold text-gl text-white hover:text-blue-500 transition-colors duration-300"><ShoppingCartOutlined className="px-2" />Order</Link>
                        <Link to={"/notification"} className="font-semibold text-gl text-white hover:text-blue-500 transition-colors duration-300"><BellOutlined className="px-2" />Notification</Link>
                        <Link
                            className="bg-white px-8 py-2 rounded-full font-medium text-[var(--color-primary)] border border-[var(--color-primary)] transition-all
                    hover:bg-transparent hover:text-white border-white"
                            to={"/login"}
                        >
                            Login
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default ClientHeader