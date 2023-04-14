import { ModalAcceso } from "./ModalAcceso"
import { useState } from "react"

export const Historial = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Historial</h1>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-4 rounded"
            > Modal Acceso </button>
            <ModalAcceso isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}