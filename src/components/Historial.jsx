import {ModalClient} from "./ModalClient";
import { useState } from 'react';

export const Historial = () => {
    let userData = {
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
    };
    const [isOpen, setIsOpen] = useState(false); // Controla si el modal está abierto o cerrado
    const isEditable = true; // el usuario tiene permiso para editar la información del cliente
    const arcoRight = 'Acceso'; // el derecho de acceso del usuario
    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Historial</h1>
            <button
       onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3 ml-3"
     >
       Abrir modal
     </button>
    <ModalClient
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      userData={userData}
      isEditable={isEditable}
      arcoRight={arcoRight}
    >
        <button onClick={() => {console.log("HOLA")}} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3 ml-3">Guardar</button>
        <button onClick={() => {console.log("HOLA")}} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-3 ml-3">Cancelar</button>
    </ModalClient>
        </div>
    )
}