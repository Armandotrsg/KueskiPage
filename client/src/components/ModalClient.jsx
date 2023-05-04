import {
    Modal,
    ModalCol,
    ModalTitle,
    ColSection,
    ModalContainer,
} from "./Modal";
import {
    spanishKeysAddresses,
    spanishKeysIdentifications,
    spanishKeysUsers,
} from "../shared/SpanishKeys";
import { UserData } from "./UserData";
import { Loader } from "./Loader";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { useState } from "react";
import { Feedback } from "./Feedback";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const ModalClient = ({
    isOpen,
    onClose,
    userData,
    isEditable,
    arcoRight,
    loadData,
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isAlert2Open, setIsAlert2Open] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [serverResponse, setServerResponse] = useState("");
    const [serverSuccess, setServerSuccess] = useState(true);

    const GeneratePDF = () => {
        // Crear una nueva instancia de jsPDF
        const doc = new jsPDF();
        const keys = Object.keys(userData);
        const addressesKeys = Object.keys(userData.addresses[0]);
        const identificationKeys = Object.keys(userData.identifications[0]);
        const otherKeys =
            userData.user_data !== null ? Object.keys(userData.user_data) : [];
    
        // Agregar la imagen
        doc.addImage(
            "https://d1.awsstatic.com/case-studies/Latam%20Cases%20Assets/Kueski.309ce0a57d3f89bf47b176fb6f1a985e373d1e90.png",
            "PNG",
            167,
            2.5,
            30,
            20
        );
    
        // Agregar el título en la esquina contraria a la imagen
        doc.text(`Datos de ${userData.name}`, 56, 15.4, null, null, "right");
    
        // Definir la tabla
        let tableData = [];
    
        // Agregar los datos del usuario
        keys.map((key) => {
            if (
                key !== "addresses" &&
                key !== "identifications" &&
                key !== "user_data"
            ) {
                tableData.push([spanishKeysUsers[key], userData[key]]);
            }
        });
    
        // Agregar los datos de otros
        if (otherKeys.length > 0) {
            otherKeys.map((key) => {
                tableData.push([key, userData.user_data[key]]);
            });
        }
    
        const tableHeaders = [["Datos de usuario", "Valor"]];
    
        // Agregar la tabla al documento
        doc.autoTable({
            head: tableHeaders,
            body: tableData,
            startY: 25, // comenzar la tabla a 30 unidades desde la parte superior
        });
    
        //Agregar una tabla nueva por cada dirección
        userData.addresses.map((address) => {
            let addressData = [];
            addressesKeys.map((key) => {
                if (key !== "user_id") {
                    addressData.push([
                        spanishKeysAddresses[key],
                        address[key],
                    ]);
                }
            });
            const tableHeaders = [[`Datos de dirección ${address.address_id}`, "Valor"]];
            doc.autoTable({
                head: tableHeaders,
                body: addressData,
                startY: doc.autoTable.previous.finalY + 10,
            });
        });
    
        //Agregar una tabla nueva por cada identificación
        userData.identifications.map((identification) => {
            let identificationData = [];
            identificationKeys.map((key) => {
                if (key !== "user_id") {
                    identificationData.push([
                        spanishKeysIdentifications[key],
                        identification[key],
                    ]);
                }
            });
            const tableHeaders = [[`Datos de identificación ${identification.identification_id}`, "Valor"]];
            doc.autoTable({
                head: tableHeaders,
                body: identificationData,
                startY: doc.autoTable.previous.finalY + 10,
            });
        });
    
        // Guardar el documento como un archivo PDF con el nombre 'userData.pdf'
        doc.save(`DatosDe${userData.name}.pdf`);
    };

    const showMessage = () => {
        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
            loadData();
        }, 3500);
    };
    const acceptProcedure = (arcoRightLetter) => {
        console.log(arcoRightLetter);
        if (arcoRightLetter === "R") {
            let bandera = true;
            //Update the database with the new data that changed
            // Get the value of all the inputs that are not a checkbox child of the modal
            let inputs = document.querySelectorAll(
                ".modal input:not([type=checkbox])"
            );
            //Filter the inputs where the attributeid does not include "userData"
            inputs = Array.from(inputs).filter((input) => {
                return !input.getAttribute("attributeid").includes("userData");
            });
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
            let dataChanged = [];
            inputs.forEach((input) => {
                //Trim the value of the input to avoid empty spaces at the beginning or end
                let inputValue = input.value.trim();
                if (
                    input.getAttribute("attributeid").includes("address") &&
                    inputValue != input.getAttribute("formerdata")
                ) {
                    bandera = false;
                    data.push({
                        column: {
                            sector: "addresses",
                            mode: "single",
                            name: input.getAttribute("name"),
                            address_id: input
                                .getAttribute("attributeID")
                                .split("_")[1],
                        },
                        data: inputValue === "N/A" ? null : inputValue,
                    });
                    dataChanged.push({
                        column: spanishKeysAddresses[input.getAttribute("name")],
                        prevData: input.getAttribute("formerdata"),
                        newData: inputValue === "N/A" ? null : inputValue,
                    });
                } else if (
                    input
                        .getAttribute("attributeID")
                        .includes("identification") &&
                    inputValue != input.getAttribute("formerdata")
                ) {
                    bandera = false;
                    data.push({
                        column: {
                            sector: "identification",
                            mode: "single",
                            name: input.getAttribute("name"),
                            identification_id: input
                                .getAttribute("attributeID")
                                .split("_")[1],
                        },
                        data: inputValue === "N/A" ? null : inputValue,
                    });
                    dataChanged.push({
                        column: spanishKeysIdentifications[input.getAttribute("name")],
                        prevData: input.getAttribute("formerdata"),
                        newData: inputValue === "N/A" ? null : inputValue,
                    });
                } else if (
                    input.getAttribute("attributeID").includes("userID") &&
                    inputValue != input.getAttribute("formerdata")
                ) {
                    bandera = false;
                    data.push({
                        column: input.getAttribute("name"),
                        data: inputValue === "N/A" ? null : inputValue,
                    });
                    dataChanged.push({
                        column: spanishKeysUsers[input.getAttribute("name")],
                        prevData: input.getAttribute("formerdata"),
                        newData: inputValue === "N/A" ? null : inputValue,
                    });
                }
            });

            //Get all the inputs where the attributeid includes "userData"
            let inputJSON = document.querySelectorAll(
                ".modal input[attributeid*=userData]"
            );
            
            let json = '{';
            let somethingChanged = false; //Flag to know if something changed in the additional data
            inputJSON.forEach((input) => {
                let inputValue = input.value.trim();
                if (inputValue !== input.getAttribute("formerdata")) {
                    somethingChanged = true;
                    bandera = false;
                    dataChanged.push({
                        column: input.getAttribute("name"),
                        prevData: input.getAttribute("formerdata"),
                        newData: inputValue === "N/A" ? null : inputValue,
                    });
                }
            })
            if (somethingChanged) { //If something did changed, build the JSON object
                inputJSON.forEach((input) => {
                    let inputValue = input.value.trim();
                    json += '"' + input.getAttribute("name") + '": "' + (inputValue === "N/A" ? null : inputValue) + '",';
                })
                json = json.slice(0, -1);
                json += '}';
                console.log(json);
            }

            if (json !== "{") { //If the JSON object is not empty, add it to the data array
                data.push({
                    column: "user_data",
                    data: json
                })
            }

            // Map through the data to make the request to the server
            data.map((item) => {
                console.log(JSON.stringify(item));
                fetch(`/api/users/${userData.user_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item),
                })
                    .then((res) => {
                        if (res.ok) {
                            setServerSuccess(true);
                            setServerResponse(
                                "Datos actualizados correctamente"
                            );
                        } else {
                            setServerSuccess(false);
                            setServerResponse("Error al actualizar los datos");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setServerSuccess(false);
                        setServerResponse("Error al actualizar los datos");
                    });
            });

            let message = "Se actualizaron los datos de: \n";
            // Convert the JSON to a string
            dataChanged.map((item) => {
                message += `\t${item.column}: ${item.prevData} -> ${item.newData}\n`;
            });
            //Save what changed to the registros_arco table
            if (dataChanged.length > 0) {
                fetch(`/api/arco_registers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userData.user_id,
                        arco_type: "R",
                        message: message,
                    }),
                }).catch((err) => {
                    console.log(err);
                });
            }

            if (!bandera) {
                showMessage();
            }
        } else if (arcoRightLetter === "A") {
            GeneratePDF();
            // Agrega el registro a la tabla de registros_arco
            fetch(`/api/arco_registers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userData.user_id,
                    arco_type: "A",
                    message: "Se generó el PDF de la solicitud de acceso",
                }),
            }).then((res) => {
                if (res.ok) {
                    setServerSuccess(true);
                    setServerResponse("PDF generado correctamente");
                } else {
                    setServerSuccess(false);
                    setServerResponse("Error al generar el PDF");
                }
            })
            .catch((err) => {
                console.log(err);
                setServerSuccess(false);
                setServerResponse("Error al generar el PDF");
            });
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
    
    const keys = Object.keys(userData);
    const addressesKeys = Object.keys(userData.addresses[0]);
    const identificationKeys = Object.keys(userData.identifications[0]);
    const otherKeys =
        userData.user_data !== null ? Object.keys(userData.user_data) : [];
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
                                                        ? userData[
                                                              key
                                                          ].toString()
                                                        : "N/A"
                                                }
                                                isEditable={
                                                    key !== "user_id" &&
                                                    isEditable &&
                                                    !key.includes("_at") &&
                                                    !key.includes("is_")
                                                }
                                                id={
                                                    "userID_" + userData.user_id
                                                }
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
                                                                    atributo={
                                                                        key
                                                                    }
                                                                    valor={
                                                                        identification[
                                                                            key
                                                                        ] !==
                                                                        null
                                                                            ? identification[
                                                                                  key
                                                                              ].toString()
                                                                            : "N/A"
                                                                    }
                                                                    isEditable={
                                                                        key !==
                                                                            "identification_id" &&
                                                                        isEditable &&
                                                                        !key.includes(
                                                                            "_at"
                                                                        )
                                                                    }
                                                                    id={
                                                                        "identificationID_" +
                                                                        identification.identification_id
                                                                    }
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
                                                                address[key] !==
                                                                null
                                                                    ? address[
                                                                          key
                                                                      ].toString()
                                                                    : "N/A"
                                                            }
                                                            isEditable={
                                                                key !==
                                                                    "address_id" &&
                                                                isEditable &&
                                                                !key.includes(
                                                                    "_at"
                                                                )
                                                            }
                                                            id={
                                                                "addressID_" +
                                                                address.address_id
                                                            }
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
                                                    userData.user_data[key] !==
                                                    null
                                                        ? userData.user_data[
                                                              key
                                                          ].toString()
                                                        : "N/A"
                                                }
                                                isEditable={isEditable}
                                                id={"userData_" + key}
                                            />
                                        );
                                    })}
                                </ColSection>
                            )}
                        </ModalCol>
                        {/* Botones */}
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
                                        arcoRight[0] === "A"
                                            ? "¿Quieres descargar el reporte en pdf?"
                                            : "¿Estás seguro que quieres realizar las modificaciones?"
                                    );
                                    setIsAlert2Open(true);
                                }}
                                toolTipContent={
                                    arcoRight[0] === "A"
                                        ? "Descargar el reporte en pdf"
                                        : "Modificar los datos y descargar el reporte en pdf"
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
                acceptFunction={() => acceptProcedure(arcoRight[0])}
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
