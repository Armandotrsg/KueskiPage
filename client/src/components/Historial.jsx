import { ModalClient } from "./ModalClient";
import { useEffect, useState } from "react";

export const Historial = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch("/api/users/1")
            .then((res) => res.json())
            .then((data) => {
                setUserData(data[0]);
                console.log(data[0]);
            });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Historial</h1>
            <button onClick={() => setModalIsOpen(true)}>Abrir modal</button>

            <ModalClient
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                userData={userData}
                arcoRight={"Rectificación"}
                isEditable
            />
        </div>
    );
};
