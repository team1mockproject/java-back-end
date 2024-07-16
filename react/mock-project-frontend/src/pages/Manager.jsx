import { useContext, useState } from "react"
import ManagerHeader from "../components/manager-header"
import ManagerSidebar from "../components/manager-sidebar"
import { Outlet } from "react-router-dom"
import ModalStateContext from "../context/modal-state-context"
const Manager = () => {
    const [isShowSidebar, setIsShowSidebar] = useState(false)
    const { modalState } = useContext(ModalStateContext)
    return (
        <>
            <div className={isShowSidebar ? 'absolute top-0 left-0 right-0 bottom-0 z-20 bg-black opacity-30' : ''}></div>
            <ManagerHeader setIsShowSidebar={setIsShowSidebar} />
            <div className={`flex items-start ${isShowSidebar || modalState ? 'h-[calc(100vh-70px)] overflow-hidden' : ''}`}>
                <ManagerSidebar
                    isShowSidebar={isShowSidebar}
                    setIsShowSidebar={setIsShowSidebar}
                />
                <Outlet />
            </div>
        </>
    )
}
export default Manager