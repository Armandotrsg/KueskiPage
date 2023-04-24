import {
    Modal,
    ModalCol,
    ModalTitle,
    ColSection,
    ModalContainer,
} from "./Modal";
import { UserData } from "./UserData";
import { Loader } from "./Loader";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { useState } from "react";
import { Feedback } from "./Feedback";

export const ModalCO = ({ isOpen, onClose, userData, arcoRight, loadData }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isAlert2Open, setIsAlert2Open] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showFeedback, setShowFeedback] = useState(false)
    const [serverResponse, setServerResponse] = useState("");
    const [serverSuccess, setServerSuccess] = useState(true);
    const [message, setMessage] = useState("");

    const showMessage = () => {
        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
            loadData();
        }, 3500);
    }
    const acceptProcedure = (arcoRightLetter) => {
        console.log("Accept");
        if (arcoRightLetter === "C") {
            if (userData.is_client) {
                setServerSuccess(false);
                setServerResponse("No se puede eliminar el usuario porque es cliente");
            } else {
                if (message === "") {
                    setServerSuccess(false);
                    setServerResponse("No se puede eliminar el usuario porque no se ha ingresado un motivo");
                } else {
                    //Delete the user
                    fetch(`/api/users/${userData.user_id}`,{
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        if (res.ok) {
                            setServerSuccess(true);
                            setServerResponse("Usuario eliminado correctamente");
                        } else {
                            setServerSuccess(false);
                            setServerResponse("Error al eliminar el usuario");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    //Post the new register
                    fetch(`/api/arco_registers`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_id: userData.user_id,
                            arco_right: arcoRightLetter,
                            message: message
                        }),
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
            }
            showMessage();
        } else if (arcoRightLetter === "O") {
            if (message === "") {
                setServerSuccess(false);
                setServerResponse("No se puede oponer al tratamiento de los datos porque no se ha ingresado un motivo");
            } else {
                //Post the new register
                fetch(`/api/arco_registers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userData.user_id,
                        arco_right: arcoRightLetter,
                        message: message
                    }),
                })
                .catch((err) => {
                    console.log(err);
                })
                setServerSuccess(true);
                setServerResponse("Se ha enviado la solicitud de oposición al tratamiento de datos");
            }
            showMessage();
        }
    }
    //Check for null or undefined
    if (userData === null || userData === undefined) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <Loader />
            </Modal>
        );
    }

    return(
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                className={`w-[98%] sm:w-[50%] h-[50%]`}
            >
                <div className="flex flex-col flex-wrap">
                    <ModalTitle>{`Derecho de ${arcoRight}`} </ModalTitle>
                    <ModalContainer>
                        <p className="text-center m-5">
                            {arcoRight === "Cancelación" ? `¿Estás seguro de borrar los datos de ${userData.name}? Ingresa el motivo de la cancelación de los datos` : `Ingresa la razón por la que te vas a oponer al tratamiento de los datos de ${userData.name}`}
                        </p>
                    </ModalContainer>
                    <ModalContainer isEditable>
                        <textarea
                            className="w-full h-32 p-2 border-2 border-gray-300 rounded-md resize-none mt-2 mb-5"
                            placeholder="Escribe aquí tu mensaje"
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            required
                        />
                        <section className="flex flex-wrap w-full items-center justify-center">
                            <Button onClick={() => {setAlertMessage("¿Está seguro de que deseas cancelar la operación?"); setIsAlertOpen(true)}} toolTipContent={"Cancelar la operación"} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" id={"cancel"}>Cancelar</Button>
                            <Button onClick={() => {setAlertMessage(arcoRight[0] === "A" ? "¿Quieres descargar el reporte en pdf?" : (arcoRight[0] === "R" ? "¿Estás seguro que quieres realizar las modificaciones?" : (arcoRight[0] === "C" ? "¿Estás seguro de que quieres borrar los datos?" : "¿Estás seguro de continuar?"))); setIsAlert2Open(true)}} toolTipContent={(arcoRight[0] === "A" ? "Descargar el reporte en pdf" : (arcoRight[0] === "R" ? "Modificar los datos y descargar el reporte en pdf" : (arcoRight[0] === "C" ? "Borrar los datos del usuario" : "Realizar el derecho de oposición de los datos del cliente")))} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-3" id={"save"}>Continuar</Button>
                        </section>
                    </ModalContainer>
                </div>
            </Modal>
            <Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} message={alertMessage} onCloseOther={onClose} acceptFunction={() => setIsAlertOpen(false)} />
            <Alert isOpen={isAlert2Open} onClose={() => setIsAlert2Open(false)} message={alertMessage} onCloseOther={onClose} acceptFunction={() => acceptProcedure(arcoRight[0])} />
            {showFeedback && <Feedback feedback={serverResponse} success={serverSuccess} />}
        </>
    )

}