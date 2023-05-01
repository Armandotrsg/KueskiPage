import faqs from "../assets/img/faqs.svg";
import { Acordion } from "./Acordion";
import { FaqsData } from "../shared/FaqsData";

export const Tutorial = () => {
    return (
        <main className="flex flex-col items-center bg-gray-100 md:h-screen md:overflow-scroll">
            {/* Div para las FAQ's */}
            <section>
                <div className="flex flex-col md:flex-row items-center justify-center md:mt-0 w-full bg-white">
                    <div className="flex text-center items-center justify-center p-5 w-[50%]">
                        <h2 className="text-[2rem] font-bold">📚 Preguntas Frecuentes</h2>
                    </div>
                    <img src={faqs} alt="FAQ's" className="md:w-[45%] mx-auto"/>
                </div>
                {/* Acordión para las FAQ's */}
                <div className="flex flex-col items-start p-10 justify-center w-full bg-white">
                    {   
                        FaqsData.map((item, index) => {
                            return <Acordion key={index} {...item} />
                        })
                    }
                </div>  
            </section>
        </main>
    );
};
