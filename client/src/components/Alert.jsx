import { Modal } from "./Modal"

export const Alert = ({ isOpen, onClose, onCloseOther, message, acceptFunction}) => {
    const acceptProcedure = () => {
        onClose()
        onCloseOther()
        acceptFunction()
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">{message}</h1>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={acceptProcedure}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4"
                    > Aceptar </button>
                </div>
            </div>
        </Modal>
    )
}