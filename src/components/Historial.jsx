import { Feedback } from "./Feedback"
import { useState } from "react";

export const Historial = () => {
    const [feedback, setFeedback] = useState(false);
    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Historial</h1>
            <button onClick={() => setFeedback(true)}>Mostrar feedback</button>
            <Feedback feedback="Feedback" isVisible={feedback} setIsVisible={setFeedback} />
        </div>
    )
}