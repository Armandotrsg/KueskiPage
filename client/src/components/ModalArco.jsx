import {
    Modal,
    ModalCol,
    ModalTitle,
    ColSection,
    ModalContainer,
} from "./Modal";

import { Button } from "./Button"

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
            <div className="justify-center">
                {/* Titulo del modal */}
                <ModalTitle>Informacion</ModalTitle>
                {/* Contenido del modal */}

                <ModalContainer title="Datos de solicitud" className="text-xl font-semibold" >
                    <section className="flex flex-wrap w-full items-center justify-center">
                    <div class="space-y-80">
                        <br />
                        <font size="5"><b>UserID:</b> {userData.user_id} <br />
                        <b>Derecho Arco:</b> {arco} <br />
                        <b>Mensaje:</b> {userData.message} <br />
                        <b>Fecha de cumplimiento:</b> {userData.created_at.split("T")[0]}</font> <br />
                    
                    </div>
                    </section>
                    
                <section className="flex flex-wrap w-full items-center justify-center">
                <div className="items-center justify-center ">
                    <Button onClick={onClose} toolTipContent={"Cancelar la operación"}className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded bottom-10 absolute bottom-10 left-70 right-45 m-auto">
                        Cancelar
                    </Button>
                </div>
                </section>
                </ModalContainer>
            </div>
        </Modal>
    )
}