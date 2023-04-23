import { useState } from "react";
import { Checkbox } from "./Checkbox";


export const UserData = ({ atributo, valor, isEditable, id }) => {
    const [isChecked, setIsChecked] = useState(true);
    const convertDateFormat = () => {
        valor = valor.split("T")[0];
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
                value={valor}
                className={`text-lg border-[1px] ${
                    isChecked ? "border-gray-300" : "border-gray-400"
                } rounded-md p-1 ml-1 mt-2 w-[100%] lg:w-[80%] xl:w-[50%]`}
                disabled={isChecked}
                required
                name={atributo}
                attributeid = {id}
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
            <h5 className={`text-lg  ${atributo.includes("_id") ? "font-bold" : "font-semibold"}`}>{atributo}: &nbsp;</h5>
            {isEditable ? (
                input
            ) : (
                <p className={`text-lg text-gray-900`}>{valor}</p>
            )}
        </li>
    );
};
