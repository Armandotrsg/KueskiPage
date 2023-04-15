import { ModalAcceso } from "./ModalAcceso"

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
    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Historial</h1>
            <ModalAcceso isOpen={true} onClose={() => {}} userData={userData} />
        </div>
    )
}