import {
    Modal,
    ModalCol,
    ModalTitle,
    ColSection,
    ModalContainer,
} from "./Modal";
import { UserData } from "./UserData";

/* userData = {
    user_id: 1,
    name: "John",
    first_last_name: "Doe",
    second_last_name: "Smith",
    date_of_birth: "1990-01-01",
    nationality: "American",
    state_of_birth: "California",
    economic_activity: "Employed",
    curp: "1234567890",
    gender: "Male",
    phone_number: 1234567890,
    email: "john.doe@example.com",
    user_data: {
        "contact_name": "John Doe",
    },
    is_client: true,
    is_blocked: false,
    created_at: "2022-01-01",
    updated_at: null,
    deleted_at: null,
    addresses: [
        {
            address_id: 1,
            country: "USA",
            state: "California",
            city: "Los Angeles",
            neighborhood: "",
            zip_code: 90001,
            street: "",
            ext_number: 1,
            int_number: null,
            created_at: "",
            updated_at: "",
            deleted_at: "",
        },
    ],
    identification: [
        {
            identification_id: 1,
            identification_type: "Passport",
            identification_number: "1234567890",
            created_at: "",
            updated_at: "",
            deleted_at: "",
        },
    ],
    registros_arco: [
        {
            registro_arco_id: 1,
            arco_type: "A",
            message: "This is a message.",
            created_at: "",
            updated_at: "",
            deleted_at: "",
        },
    ],
}; */

export const ModalClient = ({ isOpen, onClose, userData, isEditable, arcoRight, children }) => {
    const keys = Object.keys(userData);
    const addressesKeys = Object.keys(userData.addresses[0]);
    const identificationKeys = Object.keys(userData.identification[0]);
    const otherKeys = Object.keys(userData.user_data);
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
                                    key !== "identification" &&
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
                            {userData.identification.map(
                                (identification, _index) => {
                                    return (
                                        <div
                                            key={_index}
                                            className="flex flex-col space-y-4"
                                        >
                                            {identificationKeys.map(
                                                (key, index) => {
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
