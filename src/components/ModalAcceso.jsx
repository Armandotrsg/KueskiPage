import { Modal, ModalCol, ModalTitle, ColSection, UserData, ModalContainer } from "./Modal";

export const ModalAcceso = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className={`w-[90%] sm:w-[75%] h-[75%]`}>
            <div className="flex flex-col flex-wrap">
                {/* Título */}
                <ModalTitle>Derecho de Acceso </ModalTitle>
                {/* Primera columna con datos del usuario */}
                <ModalContainer>
                    <ModalCol>
                        <UserData atributo="Nombre" valor="Juan Perez" />
                        <UserData atributo="Correo" valor="juan@yahoo.com" />
                        <UserData atributo="Contraseña" valor="********" />
                        <UserData atributo="Nombre" valor="Juan Perez" />
                        <UserData atributo="Correo" valor="juan@yahoo.com" />
                        <UserData atributo="Contraseña" valor="********" />
                        <UserData atributo="Nombre" valor="Juan Perez" />
                        <UserData atributo="Correo" valor="juan@yahoo.com" />
                        <UserData atributo="Contraseña" valor="********" />
                    </ModalCol>
                    {/* Segunda columna con dirección, identificaciones y user_data */}
                    <ModalCol>
                        <ColSection title="Dirección">
                            <UserData atributo="Calle" valor="Main Street" />
                        </ColSection>
                        <ColSection title="Identificaciones">
                            <UserData atributo="INE" valor="12345678" />
                        </ColSection>
                        <ColSection title={"Otros"}>
                            <UserData atributo="Contactos" valor="Otro" />
                        </ColSection>
                    </ModalCol>
                </ModalContainer>
                {/* Botones */}
                <section className="flex flex-row justify-center md:justify-end items-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    > Cerrar </button>
                    <button
                        onClick={onClose}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    > Descargar PDF </button>
                </section>
            </div>
        </Modal>
    );
}