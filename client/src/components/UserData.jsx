import { useState } from "react";
import { Checkbox } from "./Checkbox";
import {
    spanishKeysAddresses,
    spanishKeysIdentifications,
    spanishKeysUsers,
} from "../shared/SpanishKeys";

export const UserData = ({ atributo, valor, isEditable, id }) => {
    const [isChecked, setIsChecked] = useState(true);
    let [inputText, setInputText] = useState(valor);

    const convertDateFormat = () => {
        valor = valor.split("T")[0];
        inputText = inputText.split("T")[0];
    };
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
                attributeid={id}
                formerdata={valor}
            />
        );
    }
    return (
        <li
            className={`flex flex-row flex-wrap ${
                input || isEditable ? "items-center" : ""
            }`}
        >
            {isEditable && (
                <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
            )}
            <h5
                className={`text-lg ${
                    atributo.includes("_id") ? "font-bold" : "font-semibold"
                }`}
            >
                {`${
                    spanishKeysUsers[atributo] ||
                    spanishKeysAddresses[atributo] ||
                    spanishKeysIdentifications[atributo] ||
                    atributo
                }: `}{" "}
                &nbsp;
            </h5>
            {isEditable ? (
                input
            ) : (
                <p className={`text-lg text-gray-900`}>{inputText}</p>
            )}
        </li>
    );
};
