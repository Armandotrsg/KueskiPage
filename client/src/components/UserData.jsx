import { useState } from "react";
import { Checkbox } from "./Checkbox";

export const UserData = ({ atributo, valor, isEditable, id }) => {
    const [isChecked, setIsChecked] = useState(true);
    let [inputText, setInputText] = useState(valor);

    const spanishKeysUsers = {
        user_id: "ID de usuario",
        name: "Nombre",
        first_last_name: "Apellido paterno",
        second_last_name: "Apellido materno",
        date_of_birth: "Fecha de nacimiento",
        nationality: "Nacionalidad",
        state_of_birth: "Estado de nacimiento",
        economic_activity: "Actividad económica",
        curp: "CURP",
        gender: "Género",
        phone_number: "Número de teléfono",
        email: "Email",
        is_client: "Es Cliente",
        is_blocked: "Está Bloqueado",
        created_at: "Fecha de creación",
        updated_at: "Fecha de actualización",
        deleted_at: "Fecha de eliminación",
        rfc: "RFC"
    }
    const spanishKeysAddresses = {
        address_id: "ID de dirección",
        country:  "País",
        state: "Estado",
        city: "Ciudad",
        neighborhood: "Colonia",
        zip_code: "Código postal",
        street: "Calle",
        ext_number: "Número exterior",
        int_number: "Número interior",
        created_at: "Fecha de creación",
        updated_at: "Fecha de actualización",
        deleted_at: "Fecha de eliminación",
    }
    const spanishKeysIdentifications = {
        identification_id: "ID de identificación",
        identification_type: "Tipo de identificación",
        identification_number: "Número de identificación",
        created_at: "Fecha de creación",
        updated_at: "Fecha de actualización",
        deleted_at: "Fecha de eliminación",
    }

    const convertDateFormat = () => {
        valor = valor.split("T")[0];
        inputText = inputText.split("T")[0];
    }
    if (atributo === "date_of_birth") {
        convertDateFormat();
    } else if (atributo.includes("_at")) {
        convertDateFormat();
    }
    let input = null;
    if (isEditable) {
        let inputType;
        if (atributo === "email") {
            inputType = "email";
        } else if (atributo === "date_of_birth") {
            inputType = "date";
        } else if (atributo === "phone_number") {
            inputType = "tel";
        } else {
            inputType = "text";
        }
        input = (
            <input
                type={inputType}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`text-lg border-[1px] ${
                    isChecked ? "border-gray-300" : "border-gray-400"
                } rounded-md p-1 my-2 md:my-[0.4em] ml-1 w-[100%] lg:w-[80%] xl:w-[50%]`}
                disabled={isChecked}
                required
                name={atributo}
                attributeid = {id}
                formerdata = {valor}
            />
        );
    }
    return (
        <li
            className={`flex flex-row flex-wrap ${
                input || isEditable ? "items-center" : ""
            }`}
        >
            {isEditable && <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />}
            <h5 className={`text-lg ${atributo.includes("_id") ? "font-bold" : "font-semibold"}`}>{`${spanishKeysUsers[atributo] || spanishKeysAddresses[atributo] || spanishKeysIdentifications[atributo] || atributo}: `} &nbsp;</h5>
            {isEditable ? (
                input
            ) : (
                <p className={`text-lg text-gray-900`}>{inputText}</p>
            )}
        </li>
    );
};
