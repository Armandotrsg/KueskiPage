import { Modal } from "./Modal"
import { Button } from "./Button"

export const Alert = ({ isOpen, onClose, onCloseOther, message, acceptFunction}) => {
    const acceptProcedure = () => {
        acceptFunction()
        onClose()
        onCloseOther()
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} className={"z-50"}>
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">{message}</h1>
                    <div className="flex justify-center mt-4">
                        <Button
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            id={"cancel-button"}
                            toolTipContent={"Regresar a la vista de los datos del usuario"}
                        > Regresar </Button>
                        <Button
                            onClick={acceptProcedure}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-3"
                            id={"accept-button"}
                            toolTipContent={"Aceptar la operación"}
                        > Aceptar </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}