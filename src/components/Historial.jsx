import { Alert } from "./Alert"
import { useState } from "react"

export const Historial = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Historial</h1>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            > Abrir Alerta </button>
            <Alert isOpen={isOpen} onClose={() => setIsOpen(false)} onCloseOther={() => setIsOpen(false)} message="¿Estás seguro de eliminar este cliente?" />
        </div>
    )
}