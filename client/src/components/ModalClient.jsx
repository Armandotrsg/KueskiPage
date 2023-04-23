import {
    Modal,
    ModalCol,
    ModalTitle,
    ColSection,
    ModalContainer,
} from "./Modal";
import { UserData } from "./UserData";
import { Loader } from "./Loader";


export const ModalClient = ({ isOpen, onClose, userData, isEditable, arcoRight, children }) => {
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
                    {children}
                </ModalContainer>
            </div>
        </Modal>
    );
};
