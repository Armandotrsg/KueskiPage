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


export const ModalClient = ({ isOpen, onClose, userData, isEditable, arcoRight, children }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isAlert2Open, setIsAlert2Open] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showFeedback, setShowFeedback] = useState(false)

    const showMessage = () => {
        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
            //Reload the page
            window.location.reload();
        }, 3500);
    }

    const acceptProcedure = (arcoRightLetter) => {
        console.log("Accept");
        if (arcoRightLetter === "R") {
            //Update the database with the new data that changed
            // Get the value of all the inputs that are not a checkbox child of the modal
            const inputs = document.querySelectorAll(".modal input:not([type=checkbox])");
            //Build the json object to send to the server in the format:
            /* {
                "column": {
                    "sector": "address",
                    "mode": "single",
                    "name": "state",
                    "address_id": 0
                },
                "data": "Guanajuato"
            } */
            let data = [];
            inputs.forEach((input) => {
                if (input.getAttribute("attributeid").includes("address")) {
                    data.push({
                        column: {
                            sector: "addresses",
                            mode: "single",
                            name: input.getAttribute("name"),
                            address_id: input.getAttribute("attributeID").split("_")[1]
                        },
                        data: input.value === "N/A" ? null : input.value
                    });
                } else if (input.getAttribute("attributeID").includes("identification")) {
                    data.push({
                        column: {
                            sector: "identification",
                            mode: "single",
                            name: input.getAttribute("name"),
                            identification_id: input.getAttribute("attributeID").split("_")[1]
                        },
                        data: input.value === "N/A" ? null : input.value
                    });
                } else if (input.getAttribute("attributeID").includes("user")) {
                    data.push({
                        column: input.getAttribute("name"),
                        data: input.value === "N/A" ? null : input.value
                    });
                }
            });
            // Map through the data to make the request to the server
            data.map((item) => {
                console.log(JSON.stringify(item));
                fetch(`/api/users/${userData.user_id}`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item)
                })
                .catch((err) => {
                    console.log(err);
                })
            });
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
    const keys = Object.keys(userData);
    const addressesKeys = Object.keys(userData.addresses[0]);
    const identificationKeys = Object.keys(userData.identifications[0]);
    const otherKeys = userData.user_data !== null ? Object.keys(userData.user_data) : [];
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                className={`w-[98%] sm:w-[75%] h-[75%]`}
            >
                <div className="flex flex-col flex-wrap">
                    {/* Título */}
                    <ModalTitle>{`Derecho de ${arcoRight}`} </ModalTitle>
                    {/* Primera columna con datos del usuario */}
            
                    <ModalContainer isEditable={isEditable}>
                        <ModalCol>
                            <ColSection title="Datos personales">
                                {keys.map((key, index) => {
                                    if (
                                        key !== "addresses" &&
                                        key !== "identifications" &&
                                        key !== "user_data" &&
                                        key !== "registros_arco" 
                                    ) {
                                        return (
                                            <UserData
                                                key={index}
                                                atributo={key}
                                                valor={
                                                    userData[key] !== null
                                                        ? userData[key].toString()
                                                        : "N/A"
                                                }
                                                isEditable={key !== "user_id" && isEditable && !key.includes("_at")}
                                                id= {"userID_"+userData.user_id}
                                            />
                                        );
                                    }
                                })}
                            </ColSection>
                            <ColSection title="Identificaciones">
                                {userData.identifications.map(
                                    (identification, _index) => {
                                        return (
                                            <div
                                                key={_index}
                                                className="flex flex-col space-y-4"
                                            >
                                                {identificationKeys.map(
                                                    (key, index) => {
                                                        if (key !== "user_id")
                                                        return (
                                                            <UserData
                                                                key={index}
                                                                atributo={key}
                                                                valor={
                                                                    identification[
                                                                        key
                                                                    ] !== null
                                                                        ? identification[
                                                                              key
                                                                          ].toString()
                                                                        : "N/A"
                                                                }
                                                                isEditable={key !== "identification_id" && isEditable && !key.includes("_at")}
                                                                id= {"identificationID_"+identification.identification_id}
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </ColSection>
                        </ModalCol>
                        {/* Segunda columna con dirección, identificaciones y user_data */}
                        <ModalCol>
                            <ColSection title="Direcciones">
                                {userData.addresses.map((address, _index) => {
                                    return (
                                        <div
                                            key={_index}
                                            className="flex flex-col space-y-4"
                                        >
                                            {addressesKeys.map((key, index) => {
                                                if (key !== "user_id")
                                                return (
                                                    <UserData
                                                        key={index}
                                                        atributo={key}
                                                        valor={
                                                            address[key] !== null
                                                                ? address[
                                                                      key
                                                                  ].toString()
                                                                : "N/A"
                                                        }
                                                        isEditable={key !== "address_id" && isEditable && !key.includes("_at")}
                                                        id={"addressID_"+address.address_id}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </ColSection>
                            {otherKeys.length > 0 && (
                                <ColSection title="Datos adicionales">
                                    {otherKeys.map((key, index) => {
                                        return (
                                            <UserData
                                                key={index}
                                                atributo={key}
                                                valor={
                                                    userData.user_data[key] !== null
                                                        ? userData.user_data[
                                                              key
                                                          ].toString()
                                                        : "N/A"
                                                }
                                                isEditable={isEditable}
                                            />
                                        );
                                    })}
                                </ColSection>
                            )}
                        </ModalCol>
                        {/* Botones */}
                        <section className="flex flex-wrap w-full items-center justify-center">
                            <Button onClick={() => {setAlertMessage("¿Está seguro de que desea cancelar la operación?"); setIsAlertOpen(true)}} toolTipContent={"Cancelar la operación"} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" id={"cancel"}>Cancelar</Button>
                            <Button onClick={() => {setAlertMessage("¿Está seguro de que quieres modificar los datos?"); setIsAlert2Open(true)}} toolTipContent={"Guardar los cambios"} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-3" id={"save"}>Guardar</Button>
                        </section>
                    </ModalContainer>
                </div>
            </Modal>
            <Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} message={alertMessage} onCloseOther={onClose} acceptFunction={() => setIsAlertOpen(false)} />
            <Alert isOpen={isAlert2Open} onClose={() => setIsAlert2Open(false)} message={alertMessage} onCloseOther={onClose} acceptFunction={() => acceptProcedure(arcoRight[0])} />
            {showFeedback && <Feedback feedback={"Operación realizada con éxito"} />}
        </>
    );
};
