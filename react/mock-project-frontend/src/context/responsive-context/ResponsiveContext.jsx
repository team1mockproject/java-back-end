import { createContext } from "react";
import { useMediaQuery } from "react-responsive";

const ResponsiveContext = createContext()
const ResponsiveWrapper = (props) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    const isTablet = useMediaQuery({ maxWidth: 1023, minWidth: 640 })
    const isMobile = useMediaQuery({ maxWidth: 639 })

    return (
        <ResponsiveContext.Provider value={{ isDesktop, isTablet, isMobile }}>
            {props.children}
        </ResponsiveContext.Provider>
    )
}
export { ResponsiveContext, ResponsiveWrapper }