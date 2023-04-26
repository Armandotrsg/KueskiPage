// This is a modal component. It takes in an isOpen prop to determine whether or not to display the modal. It also takes in an onClose function to execute when the user clicks outside of the modal.
// It also takes in a children prop which is the content of the modal.
// The component returns a div element that contains the backdrop and the actual modal. The backdrop is visible when the isOpen prop is true, and invisible when the isOpen prop is false. The modal is visible when the isOpen prop is true, and invisible when the isOpen prop is false.
// The onClose function is called when the user clicks outside of the modal.

export const Modal = ({ isOpen, onClose, className, children }) => {
    if (!isOpen) return null;
    return (
        // Backdrop
        <div
            onClick={onClose}
            className={`
            fixed inset-0 flex items-center justify-center transition-colors ${
                isOpen ? "visible bg-black/20" : "invisible"
            }
        `}
        >
            {/* Modal Background */}
            <main
                className={`bg-white rounded-xl shadow p-6 transition-all ${
                    isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
                } overflow-x-hidden modal ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Closing button */}
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 flex justify-center items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                    >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
                {/* Modal Content */}
                <section>{children}</section>
            </main>
        </div>
    );
};

/**
 * ModalTitle
 * @param children - The text to be rendered inside the ModalTitle component
 * @returns The modal title JSX
 */
export const ModalTitle = ({ children }) => {
    return (
        <div className="flex justify-center m-2">
            <h1 className="text-2xl font-bold text-center">{children}</h1>
        </div>
    );
};

/**
 *
 * @param children - The JSX to be rendered inside the ModalContainer component. Must be ModalCol components
 * @returns
 */
export const ModalContainer = ({ isEditable, children }) => {
    if (isEditable) {
        return (
            <form className="flex flex-row flex-wrap">{children}</form>
        )
    } else {
        return (
            <div className="flex flex-row flex-wrap">{children}</div>
        )
    }
};

/**
 *
 * @param children - The JSX to be rendered inside the ModalCol component. Must be UserData components or ColSection components
 * @returns
 */
export const ModalCol = ({ children }) => {
    return (
        <section className={`flex w-[100%] md:w-[50%] justify-center `}>
            <div className="flex flex-col space-y-6 p-6">{children}</div>
        </section>
    );
};

/**
 *
 * @param title - The title of the section
 * @param children - The JSX to be rendered inside the ColSection component. Must be UserData components
 * @returns
 */
export const ColSection = ({ title, children }) => {
    return (
        <section className="flex flex-col space-y-4 text-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <ul className="flex flex-col space-y-4">{children}</ul>
        </section>
    );
};

