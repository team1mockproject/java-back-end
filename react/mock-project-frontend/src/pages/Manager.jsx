import { useState } from "react"
import ManagerHeader from "../components/manager-header"
import ManagerSidebar from "../components/manager-sidebar"
const Manager = () => {
    const [isShowSidebar, setIsShowSidebar] = useState(false)
    return (
        <>
            <ManagerHeader setIsShowSidebar={setIsShowSidebar} />
            <div>
                <ManagerSidebar
                    isShowSidebar={isShowSidebar}
                    setIsShowSidebar={setIsShowSidebar}
                />
            </div>
        </>
    )
}
export default Manager