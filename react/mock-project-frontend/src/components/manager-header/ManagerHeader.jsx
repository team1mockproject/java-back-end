import { IoLogOutOutline, IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5"
import Logo from "../../assets/logo-1.jfif"
import { FaChevronDown, FaInfoCircle, FaUser } from "react-icons/fa"
import { MdVpnKey } from "react-icons/md"
import { useState } from "react"
const ManagerHeader = () => {
    const [isHover, setIsHover] = useState(false)
    return (
        <ul className="h-[70px] bg-[var(--color-primary)] flex justify-between items-center px-4">
            <li>
                <img
                    className="h-[70px]"
                    src={Logo}
                    alt="" />
            </li>
            <li className="flex items-center text-white cursor-pointer h-full">
                <div className="flex items-center mr-10 h-full" onMouseOver={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                    {isHover ? <IoNotificationsSharp className="text-2xl mr-2" /> : <IoNotificationsOutline className="text-2xl mr-2" />}
                    <span>Notification</span>
                </div>
                <div className="group flex items-center relative cursor-pointer h-full">
                    <FaUser className="text-2xl mr-2" />
                    <span>Manager</span>
                    <FaChevronDown className="ml-1" />
                    <ul className="group-hover:block hidden absolute text-black top-full right-0 w-[250px] p-1 bg-white shadow-[0_9px_28px_8px_rgba(0,0,0,0.05)] rounded-md">
                        <li className="flex items-center pl-4 py-3 hover:bg-gray-100 cursor-pointer rounded-md">
                            <FaInfoCircle className="text-lg mr-2" />
                            Personal information
                        </li>
                        <li className="flex items-center pl-4 py-3 hover:bg-gray-100 cursor-pointer rounded-md">
                            <MdVpnKey className="text-lg mr-2" />
                            Change password
                        </li>
                        <li className="flex items-center pl-4 py-3 hover:bg-gray-100 cursor-pointer rounded-md">
                            <IoLogOutOutline className="text-lg mr-2" />
                            Logout
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    )
}
export default ManagerHeader