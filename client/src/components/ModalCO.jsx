import { Modal, ModalTitle, ModalContainer } from "./Modal";
import { Loader } from "./Loader";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { useState } from "react";
import { Feedback } from "./Feedback";
import { Tooltip } from "react-tooltip";
import {
    RazonesPrimarias,
    RazonesSecundarias,
} from "../shared/RazonesOposicion";

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
                            data: "null",
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
                            message: trimmedMessage + " (Datos adicionales).",
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
            //Get all the checked checkboxes
            const checkboxes = document.querySelectorAll(
                'input[type="checkbox"]:checked'
            );

            //Check if there is at least one checkbox checked
            if (checkboxes.length === 0) {
                setServerSuccess(false);
                setServerResponse(
                    "No se puede enviar la solicitud porque no se ha seleccionado una razón"
                );
            } else {
                let razonesPrimarias = [];
                let razonesSecundarias = [];
                //Get the values of the checked checkboxes
                checkboxes.forEach((checkbox) => {
                    if (checkbox.getAttribute("tiporazon") === "primaria") {
                        razonesPrimarias.push(checkbox.value);
                    } else {
                        razonesSecundarias.push(checkbox.value);
                    }
                });
                let messageOposicion = "";
                if (razonesPrimarias.length > 0) {
                    if (razonesPrimarias.length > 1) {
                        messageOposicion = `Razones primarias:\n\t${razonesPrimarias.join(
                            "\n\t"
                        )}`;
                    } else {
                        messageOposicion = `Razón primaria:\n\t${razonesPrimarias.join(
                            ", "
                        )}`;
                    }
                    messageOposicion = `${messageOposicion.slice(0, -1)}.${
                        razonesSecundarias.length > 0 ? "\n" : ""
                    }`;
                }

                if (razonesSecundarias.length > 0) {
                    if (razonesSecundarias.length > 1) {
                        messageOposicion = `${messageOposicion} Razones secundarias:\n\t${razonesSecundarias.join(
                            "\n\t"
                        )}`;
                    } else {
                        messageOposicion = `${messageOposicion} Razón secundaria:\n\t${razonesSecundarias.join(
                            ""
                        )}`;
                    }
                    // Set the email of the user to null
                    fetch(`/api/users/${userData.user_id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            column: "email",
                            data: "N/A",
                        }),
                    }).catch((err) => {
                        console.log(err);
                    });
                }

                //Trim the message
                const trimmedMessage = messageOposicion.trim();

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
                className={`w-[98%] ${
                    arcoRight[0] === "O"
                        ? "h-[75%] md:w-[75%]"
                        : "h-fit md:w-[50%]"
                }`}
            >
                <div className="flex flex-col flex-wrap">
                    <ModalTitle>{`Derecho de ${arcoRight}`} </ModalTitle>
                    <ModalContainer>
                        <p className="text-center m-5">
                            {arcoRight === "Cancelación"
                                ? `¿Estás seguro de borrar los datos de `
                                : `Selecciona la razón por la que  `}
                            <strong>{`${userData.name} ${userData.first_last_name} ${userData.second_last_name}`}</strong>
                            {arcoRight === "Cancelación"
                                ? `? Esta acción no se puede deshacer.`
                                : " desea oponerse al tratamiento de sus datos personales. "}
                            {arcoRight === "Cancelación" &&
                            userData.is_client ? (
                                <strong>
                                    {" "}
                                    El usuario es un cliente activo, por lo que
                                    solo se pueden eliminar los datos
                                    adicionales.
                                </strong>
                            ) : arcoRight === "Oposición" &&
                              userData.is_client ? (
                                <strong>
                                    El usuario es un cliente activo por lo que
                                    solo podrás seleccionar razones secundarias.
                                </strong>
                            ) : (
                                ""
                            )}
                            {arcoRight === "Cancelación"
                                ? " Ingresa el motivo de la cancelación de los datos."
                                : ""}
                        </p>
                    </ModalContainer>
                    <ModalContainer isEditable>
                        {arcoRight === "Cancelación" ? (
                            <textarea
                                className="w-full h-32 p-2 border-2 border-gray-300 rounded-md resize-none mt-2 mb-5"
                                placeholder="Escribe aquí tu mensaje"
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                required
                            />
                        ) : (
                            <div className="flex flex-col mb-5">
                                <section
                                    className={`flex flex-col w-[100%] justify-start mx-4 `}
                                >
                                    <div className="flex items-center justify-center">
                                        <div
                                            data-tooltip-content="Finalidad de uso de datos: prestación de servicios"
                                            data-tooltip-id="infoPrimaria"
                                            data-tooltip-variant="info"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-info-circle"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                            </svg>
                                            <Tooltip id="infoPrimaria" />
                                        </div>
                                        <h4 className="font-semibold p-4 text-center">
                                            Razones Primarias de Oposición:
                                        </h4>
                                    </div>
                                    <ul className="flex flex-col space-y-4 justify-start">
                                        {RazonesPrimarias.options.map(
                                            (option, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="flex items-center"
                                                    >
                                                        <div>
                                                            <input
                                                                type="checkbox"
                                                                id={`reason-primary-${index}`}
                                                                name={`reason-primary-${index}`}
                                                                value={option}
                                                                tiporazon="primaria"
                                                                disabled={
                                                                    userData.is_client
                                                                }
                                                            />
                                                        </div>
                                                        <label
                                                            className={`ml-2 ${
                                                                userData.is_client
                                                                    ? "text-gray-600"
                                                                    : ""
                                                            }`}
                                                            htmlFor={`reason-primary-${index}`}
                                                        >
                                                            {option}
                                                        </label>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>

                                    <div className="flex items-center justify-center">
                                        <div
                                            data-tooltip-content="Finalidad de uso de datos: comercial, marketing y testimonial."
                                            data-tooltip-id="infoSecundaria"
                                            data-tooltip-variant="info"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-info-circle"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold p-4 text-center">
                                            Razones Secundarias de Oposición:
                                        </h4>
                                    </div>
                                    <ul className="flex flex-col space-y-4 justify-start">
                                        {RazonesSecundarias.options.map(
                                            (option, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="flex items-center"
                                                    >
                                                        <div>
                                                            <input
                                                                type="checkbox"
                                                                id={`reason-secondary-${index}`}
                                                                name={`reason-secondary-${index}`}
                                                                value={option}
                                                                tiporazon="secundaria"
                                                            />
                                                        </div>
                                                        <label
                                                            className="ml-2"
                                                            htmlFor={`reason-secondary-${index}`}
                                                        >
                                                            {option}
                                                        </label>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </section>
                            </div>
                        )}
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
