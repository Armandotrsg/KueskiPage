import arrow from "../assets/img/arrow.svg";

export const Acordion = ({ question, answer}) => {
    return (
        <div className="relative w-full overflow-hidden rounded-md">
            {/* Question */}
            <input type="checkbox" className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"/>
            <div className="bg-blue-500 h-12 w-full pl-5 flex items-center">
                <h1 className="text-lg font-semibold text-white">
                    {question}
                </h1>
            </div>
            {/* Arrow */}
            <div className="absolute top-3 right-3 text-white transition-transform duration-500 rotate-90 peer-checked:-rotate-90">
                <img src={arrow} alt="Arrow" className="w-6 h-6"/>
            </div>
            {/* Answer */}
            <div className="bg-gray-100 transition-all duration-500 origin-top max-h-0 peer-checked:max-h-80">
                <div className="p-4">
                    <p>
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}