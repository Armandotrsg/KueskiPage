import { Button } from "./Button";

export const Historial = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Historial</h1>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => console.log("HOLA MUNDO")}
                type={"button"}
                toolTipContent={"HOLA MUNDO"}
                toolTipPlace={"right"}
                id={"hola-mundo"}
            >
                HOLA MUNDO
            </Button>
        </div>
    );
};
