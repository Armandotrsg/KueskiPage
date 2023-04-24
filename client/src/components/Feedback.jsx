export const Feedback = ({ feedback, success }) => {
    return (
        <div
            className={
                "absolute flex flex-col bottom-2 md:top-2 right-2 h-fit w-fit bg-white rounded-md shadow-xl text-start"
            }
        >
            <p className="text-sm px-4 py-2">
                <strong className="font-semibold">{feedback}</strong>
            </p>

            <div
                className={`${success ? "bg-blue-500" : "bg-red-500"} h-2 rounded-full transition-all animate-decrease`}
            ></div>
        </div>
    );
};
