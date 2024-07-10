import { IoLogOutOutline, IoMenu, IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5"
import Logo from "../../assets/logo-1.jfif"
import { FaChevronDown, FaInfoCircle, FaUser } from "react-icons/fa"
import { MdVpnKey } from "react-icons/md"
import { useContext, useState } from "react"
import ResponsiveContext from "../../context/responsive-context"
const ManagerHeader = (props) => {
    const { setIsShowSidebar } = props
    const [isHover, setIsHover] = useState(false)
    const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext)
    return (
        <ul className="h-[70px] bg-[var(--color-primary)] flex justify-between items-center px-4">
            {isDesktop &&
                <>
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
                            <ul className="group-hover:block hidden absolute z-10 text-black top-full right-0 w-[250px] p-1 bg-white shadow-[0_9px_28px_8px_rgba(0,0,0,0.05)] rounded-md">
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
                </>
            }
            {isTablet &&
                <>
                    <li className="flex items-center">
                        <img
                            className="h-[70px]"
                            src={Logo}
                            alt="" />
                        <IoMenu className="text-3xl text-white ml-5"
                            onClick={() => { setIsShowSidebar(true) }}
                        />
                    </li>
                    <li className="flex items-center text-white cursor-pointer h-full">
                        <div className="flex items-center mr-10 h-full" onMouseOver={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                            {isHover ? <IoNotificationsSharp className="text-2xl mr-2" /> : <IoNotificationsOutline className="text-2xl mr-2" />}
                        </div>
                        <div className="group flex items-center relative cursor-pointer h-full">
                            <FaUser className="text-2xl mr-2" />
                            <span>Manager</span>
                            <FaChevronDown className="ml-1" />
                            <ul className="group-hover:block hidden absolute z-10 text-black top-full right-0 w-[250px] p-1 bg-white shadow-[0_9px_28px_8px_rgba(0,0,0,0.05)] rounded-md">
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
                </>
            }
            {isMobile &&
                <>
                    <li className="flex items-center">
                        <img
                            className="h-[70px]"
                            src={Logo}
                            alt="" />
                        <IoMenu className="text-3xl text-white ml-1"
                            onClick={() => { setIsShowSidebar(true) }}
                        />
                    </li>
                    <li className="flex items-center text-white cursor-pointer h-full">
                        <div className="flex items-center mr-3 h-full" onMouseOver={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                            {isHover ? <IoNotificationsSharp className="text-2xl mr-2" /> : <IoNotificationsOutline className="text-2xl mr-2" />}
                        </div>
                        <div className="group flex items-center relative cursor-pointer h-full">
                            <FaUser className="text-2xl mr-2" />
                            <FaChevronDown className="ml-1" />
                            <ul className="group-hover:block hidden absolute z-10 text-black top-full right-0 w-[250px] p-1 bg-white shadow-[0_9px_28px_8px_rgba(0,0,0,0.05)] rounded-md">
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
                </>
            }
        </ul>
    )
}
export default ManagerHeader