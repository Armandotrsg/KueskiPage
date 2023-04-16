import { Feedback } from "./Feedback"
import { useState } from "react";

export const Historial = () => {
    const [showFeedback, setShowFeedback] = useState(false);
    function showMessage() {
        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
        }, 2000);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Historial</h1>
            <button onClick={() => showMessage()}>Mostrar feedback</button>
            {showFeedback && <Feedback feedback="Se actualizó la base de datos" />}
        </div>
    )
}