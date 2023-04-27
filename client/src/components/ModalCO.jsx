import { Modal, ModalTitle, ModalContainer } from "./Modal";
import { Loader } from "./Loader";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { useState } from "react";
import { Feedback } from "./Feedback";

export const ModalCO = ({ isOpen, onClose, userData, arcoRight, loadData }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isAlert2Open, setIsAlert2Open] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [serverResponse, setServerResponse] = useState("");
    const [serverSuccess, setServerSuccess] = useState(true);
    const [message, setMessage] = useState("");

    const showMessage = () => {
        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
            loadData();
        }, 3500);
    };
    const acceptProcedure = (arcoRightLetter) => {
        console.log("Accept");
        if (arcoRightLetter === "C") {
            if (userData.is_client) {
                if (message === "") {
                    setServerSuccess(false);
                    setServerResponse(
                        "No se pueden eliminar los datos adicionales del usuario porque no se ha ingresado un motivo"
                    );
                } else if (userData.user_data === null) {
                    setServerSuccess(false);
                    setServerResponse(
                        "No se pueden eliminar los datos adicionales del usuario porque no existen"
                    );
                } else {
                    fetch(`/api/users/${userData.user_id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            column: "user_data",
                            data: "null"
                        }),
                    })
                        .then((res) => {
                            if (res.ok) {
                                setServerSuccess(true);
                                setServerResponse(
                                    "Se borraron los datos adicionales del usuario correctamente"
                                );
                            } else {
                                setServerSuccess(false);
                                setServerResponse(
                                    "Error al eliminar los datos adicionales del usuario"
                                );
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            setServerSuccess(false);
                            setServerResponse(
                                "Error al eliminar los datos adicionales del usuario"
                            );
                        });
                    //Trim the message
                    const trimmedMessage = message.trim();
                    //Post the new register
                    fetch(`/api/arco_registers`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_id: userData.user_id,
                            arco_type: arcoRightLetter,
                            message: trimmedMessage + " (Datos adicionales)."
                        }),
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            } else {
                if (message === "") {
                    setServerSuccess(false);
                    setServerResponse(
                        "No se puede eliminar el usuario porque no se ha ingresado un motivo"
                    );
                } else {
                    //Delete the user
                    fetch(`/api/users/${userData.user_id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((res) => {
                            if (res.ok) {
                                setServerSuccess(true);
                                setServerResponse(
                                    "Usuario eliminado correctamente"
                                );
                            } else {
                                setServerSuccess(false);
                                setServerResponse(
                                    "Error al eliminar el usuario"
                                );
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            setServerSuccess(false);
                            setServerResponse("Error al eliminar el usuario");
                        }); 
                    //Trim the message
                    const trimmedMessage = message.trim();
                    //Post the new register
                    fetch(`/api/arco_registers`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_id: userData.user_id,
                            arco_type: arcoRightLetter,
                            message: trimmedMessage,
                        }),
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
            showMessage();
        } else if (arcoRightLetter === "O") {
            if (message === "") {
                setServerSuccess(false);
                setServerResponse(
                    "No se puede oponer al tratamiento de los datos porque no se ha ingresado un motivo"
                );
            } else {
                //Trim the message
                const trimmedMessage = message.trim();
                //Post the new register
                fetch(`/api/arco_registers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userData.user_id,
                        arco_type: "O",
                        message: trimmedMessage,
                    }),
                })
                    .then((res) => {
                        if (res.ok) {
                            setServerSuccess(true);
                            setServerResponse(
                                "Se ha enviado la solicitud correctamente"
                            );
                        } else {
                            setServerSuccess(false);
                            setServerResponse("Error al enviar la solicitud");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setServerSuccess(false);
                        setServerResponse("Error al enviar la solicitud");
                    });
            }
            showMessage();
        }
    };
    //Check for null or undefined
    if (userData === null || userData === undefined) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <Loader />
            </Modal>
        );
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                className={`w-[98%] md:w-[50%] h-fit`}
            >
                <div className="flex flex-col flex-wrap">
                    <ModalTitle>{`Derecho de ${arcoRight}`} </ModalTitle>
                    <ModalContainer>
                        <p className="text-center m-5">
                            {arcoRight === "Cancelación"
                                ? `¿Estás seguro de borrar los datos de `
                                : `Ingresa la razón por la que te vas a oponer al tratamiento de los datos de `}
                            <strong>{`${userData.name} ${userData.first_last_name} ${userData.second_last_name}`}</strong>
                            {arcoRight === "Cancelación"
                                ? `? Esta acción no se puede deshacer. ${
                                      userData.is_client
                                          ? "El usuario es un cliente activo, por lo que solo se pueden eliminar los datos adicionales. Ingresa el motivo de la cancelación de los datos."
                                          : ""
                                  }`
                                : ""}
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
                            <Button
                                onClick={() => {
                                    setAlertMessage(
                                        "¿Está seguro de que deseas cancelar la operación?"
                                    );
                                    setIsAlertOpen(true);
                                }}
                                toolTipContent={"Cancelar la operación"}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                id={"cancel"}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => {
                                    setAlertMessage(
                                        arcoRight[0] === "C"
                                            ? "¿Estás seguro de que quieres borrar los datos?"
                                            : "¿Estás seguro de continuar?"
                                    );
                                    setIsAlert2Open(true);
                                }}
                                toolTipContent={
                                    arcoRight[0] === "C"
                                        ? "Borrar los datos del usuario"
                                        : "Realizar el derecho de oposición de los datos del cliente"
                                }
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-3"
                                id={"save"}
                            >
                                Continuar
                            </Button>
                        </section>
                    </ModalContainer>
                </div>
            </Modal>
            <Alert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}
                onCloseOther={onClose}
                acceptFunction={() => setIsAlertOpen(false)}
            />
            <Alert
                isOpen={isAlert2Open}
                onClose={() => setIsAlert2Open(false)}
                message={alertMessage}
                onCloseOther={onClose}
                acceptFunction={() => acceptProcedure(arcoRight[0])}
            />
            {showFeedback && (
                <Feedback feedback={serverResponse} success={serverSuccess} />
            )}
        </>
    );
};
