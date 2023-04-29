import {
    Modal,
    ModalCol,
    ModalTitle,
    ColSection,
    ModalContainer,
} from "./Modal";

import { Loader } from "./Loader";

export const ModalArco = ({
    isOpen,
    onClose,
    userData
    
    ,}) => {

    //Check for null or undefined
    if (userData === null || userData === undefined) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <Loader />
            </Modal>
        );
    }

    const keys = Object.keys(userData);

    //Este bloque de codigo no se si este funcionando bien
    let arco = "hola";
    console.log('lkdksadfla')
    if(userData.arco_type == "A")
    {
        arco = "Acceso"
    }
    else if(userData.arco_type == "R")
    {
        arco = "Registro"
    }
    else if(userData.arco_type == "C")
    {
        arco = "Correcion"
    }
    else if(userData.arco_type == "O")
    {
        arco = "Oposicion"
    }

    return(
        
        <Modal isOpen={isOpen} onClose={onClose}
        className={`w-[98%] sm:w-[75%] h-[75%]`}
        >
            <div >
                {/* Titulo del modal */}
                <ModalTitle>Informacion</ModalTitle>
                {/* Contenido del modal */}

                <ModalContainer title="Datos de solicitud">
                    <div>
                        UserID: {userData.user_id} <br />
                        Derecho Arco: {arco} <br />
                        Mensaje: {userData.message} <br />
                        Fecha de cumplimiento: {userData.created_at.split("T")[0]} <br />
                    </div>

                </ModalContainer>
            </div>
        </Modal>
    )
    

}