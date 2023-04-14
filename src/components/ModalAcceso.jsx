import { Modal } from "./Modal";

export const ModalAcceso = ({ isOpen, onClose }) => {
    const UserData = ({atributo, valor}) => {
        return (
            <li className="flex flex-row">
                <h5 className="text-lg font-semibold">{atributo}: &nbsp;</h5>
                <p className="text-md text-gray-900">{valor}</p>
            </li>
        );
    }
    const ModalCol = ({children}) => {
        if (children[0].type.name === "UserData") {
            return (
                <section className="flex w-[50%] justify-center">
                    <ul className="flex flex-col space-y-6 p-6">
                        {children}
                    </ul>
                </section>
            );
        } else {
            return (
                <section className="flex w-[50%] justify-center">
                    <div className="flex flex-col space-y-6 p-6">
                        {children}
                    </div>
                </section>
            );
        }
        
    }
    const ColSection = ({title, children}) => {
        return(
            <section className="flex flex-col space-y-4 text-center">
                <h3 className="text-xl font-semibold">{title}</h3>
                 <ul>
                    {children}
                 </ul>
            </section>
        )
    }
    const ModalTitle = ({children}) => {
        return (
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold">{children}</h1>
            </div>
        );
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} className={`w-[75%] h-[75%]`}>
            <div className="flex flex-col">
                {/* Título */}
                <ModalTitle>Derecho de Acceso (A) </ModalTitle>
                {/* Primera columna con datos del usuario */}
                <div className="flex flex-row">
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
                    {/* Segunda columna con dirección e identificaciones */}
                    <ModalCol>
                        <ColSection title="Dirección">
                            <UserData atributo="Calle" valor="Main Street" />
                        </ColSection>
                        <ColSection title="Identificaciones">
                            <UserData atributo="INE" valor="12345678" />
                        </ColSection>
                    </ModalCol>
                </div>
                <section className="flex flex-row justify-end items-end space-x-4">
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