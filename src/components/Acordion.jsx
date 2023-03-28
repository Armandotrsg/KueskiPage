import arrow from "../assets/img/arrow.svg";

export const Acordion = ({ question, answer}) => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border-2">
                <div className="accordion-header flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{question}</h2>
                    <img src={arrow} alt="Arrow" className="w-6 h-6"/>
                </div>
                <div className="accordion-body">
                    <div className="p-4 border-t">
                        <p className="text-gray-500">{answer}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}