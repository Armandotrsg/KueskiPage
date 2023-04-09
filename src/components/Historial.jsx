import { Modal } from "./Modal"
import { useState } from "react"

export const Historial = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Historial</h1>
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">Abrir modal</button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h1 className="text-2xl font-bold">Modal</h1>
            </Modal>
        </div>
    )
}