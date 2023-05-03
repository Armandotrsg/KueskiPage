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
    let arco = "";
    if(userData.arco_type == "A")
    {
        arco = "Acceso"
    }
    else if(userData.arco_type == "R")
    {
        arco = "Rectificación"
    }
    else if(userData.arco_type == "C")
    {
        arco = "Cancelación"
    }
    else if(userData.arco_type == "O")
    {
        arco = "Oposición"
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
                    <section className="flex flex-wrap w-full items-center justify-start">
                    <div class="flex flex-col space-y-4 mx-5 my-5 ">
                        <p className="text-lg">
                            <strong>UserID:</strong> {userData.user_id} 
                        </p>
                        <p className="text-lg">
                            <strong>Derecho Arco:</strong> {arco} 
                        </p>
                        <p className="text-lg"> 
                            <strong>Mensaje:</strong> {userData.message}
                        </p>
                        <p className="text-lg">
                            <strong>Fecha de cumplimiento:</strong> {userData.created_at.split("T")[0]}<br />
                        </p>
                    
                    </div>
                    </section>
                <div className="flex w-full min-h-[200px] md:min-h-[250px]">
                    <div className="flex items-end justify-center w-full ">
                            <Button onClick={onClose} toolTipContent={"Cancelar la operación"}className="mx-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                Cancelar
                            </Button>
                    </div>
                </div>
               
                </ModalContainer>
            </div>
        </Modal>
    )
}