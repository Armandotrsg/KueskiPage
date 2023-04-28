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
    onClose
    //arcoRegister
    
    ,}) => {

    //Check for null or undefined
    // if (userData === null || userData === undefined) {
    //     return (
    //         <Modal isOpen={isOpen} onClose={onClose}>
    //             <Loader />
    //         </Modal>
    //     );
    // }

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            Hola
        </Modal>
    )
    

}