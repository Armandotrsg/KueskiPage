import arrow from "../assets/img/arrow.svg";

export const Acordion = ({question, answer}) => {
    return (
        <div className="relative w-full overflow-hidden mb-5">
            {/* Question */}
            <input type="checkbox" className="peer absolute top-0 inset-x-0 w-full h-20 md:h-12 opacity-0 z-10 cursor-pointer" />
            <div className=" h-fit w-full p-5 md:p-3 flex items-center border-b-2 border-gray-200">
                <h1 className="text-2xl font-semibold ">
                    {question}
                </h1>
            </div>
            {/* Arrow */}
            <div className="absolute top-3 right-3 text-white transition-transform duration-500 rotate-90 peer-checked:-rotate-90">
                <img src={arrow} alt="Arrow" className="w-6 h-6"/>
            </div>
            {/* Answer */}
            <div  className="transition-all duration-500 origin-top max-h-0 peer-checked:max-h-96">
                <div className="p-4">
                    <p>
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}