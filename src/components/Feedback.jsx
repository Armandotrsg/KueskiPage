import { useEffect, useState } from "react";

export const Feedback = ({ feedback, isVisible, setIsVisible }) => {

    const hide = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        setTimeout(() => {
            hide();
        }, 2000);
    }, []);

    if (!isVisible) return null;
    return (
        <div className={"absolute flex flex-col top-2 right-2 w-fit bg-white rounded-md shadow-lg text-start"}>
            <p className="text-sm font-bold px-4 py-2">{feedback}</p>
            <div class="w-full bg-gray-200 rounded-md h-2 dark:bg-gray-700">
                <div
                    className={`bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out progress-bar`}
                ></div>
            </div>
        </div>
    );
};
