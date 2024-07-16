import { createContext, useState } from "react";

const ModalStateContext = createContext()
const ModalStateWrapper = (props) => {
    const [modalState, setModalState] = useState(false)
    return (
        <ModalStateContext.Provider value={{ modalState, setModalState }}>
            {props.children}
        </ModalStateContext.Provider>
    )
}

export { ModalStateContext, ModalStateWrapper }