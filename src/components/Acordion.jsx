import arrow from "../assets/img/arrow.svg";

export const Acordion = ({ question, answer}) => {
    return (
        <div className="relative w-[400px] overflow-hidden rounded-md">
            {/* Question */}
            <input type="checkbox" className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"/>
            <div className="bg-blue-500 h-12 w-full pl-5 flex items-center">
                <h1 className="text-lg font-semibold text-white">
                    {question}
                </h1>
            </div>
            {/* Arrow */}
            <div className="absolute top-3 right-3 text-white transition-transform duration-500 rotate-180 peer-checked:rotate-90">
                <img src={arrow} alt="Arrow" className="w-6 h-6"/>
            </div>
            {/* Answer */}
            <div className="bg-white overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40">
                <div className="p-4">
                    <p>
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}