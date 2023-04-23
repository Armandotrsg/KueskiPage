import { useState } from "react";
import { Checkbox } from "./Checkbox";


export const UserData = ({ atributo, valor, isEditable }) => {
    const [isChecked, setIsChecked] = useState(true);
    const [inputText, setInputText] = useState(valor);
    const convertDateFormat = () => {
        setInputText(inputText.split("T")[0]);
    }
    let input = null;
    if (isEditable) {
        let _atributo;
        if (atributo === "email") {
            _atributo = "email";
        } else if (atributo === "date_of_birth") {
            _atributo = "date";
            convertDateFormat;
        } else if (atributo === "phone_number") {
            _atributo = "tel";
        } else {
            _atributo = "text";
        }
        input = (
            <input
                type={_atributo}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`text-lg border-[1px] ${
                    isChecked ? "border-gray-300" : "border-gray-400"
                } rounded-md p-1 ml-1 mt-2 w-[100%] lg:w-[80%] xl:w-[50%]`}
                disabled={isChecked}
                required
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
