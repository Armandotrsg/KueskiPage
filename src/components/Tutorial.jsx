import faqs from "../assets/img/faqs.svg";
import { Acordion } from "./Acordion";
import { FaqsData } from "../shared/FaqsData";

export const Tutorial = () => {
    return (
        <main className="flex flex-col items-center bg-gray-100 h-screen overflow-scroll">
            {/* Título */}
            <div className="flex text-center my-10">
                <h1 className="text-[2.5rem] font-bold ml-4">🤔 ¿Tienes Preguntas? </h1>
            </div>
            {/* Video */}
            <section className="flex flex-col items-center justify-center mt-5 ">
                {/* Div para título del video */}
                <div className="flex items-center">
                    <h2 className="text-[1.5em] font-bold ml-4 mb-5">¡Este video te puede ayudar 🎥!</h2>
                </div>
                {/*Div para la posición del video*/}
                <div className="w-4/5 md:w-2/3 lg:w-2/3 h-96">
                    {/*Estilo cuadro donde se muestra el video*/}
                    <video
                        className="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
                        muted
                        controls
                    >
                        {/*Ruta al  video*/}
                        <source
                            src="src\assets\img\video_tutorial.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>
            {/* Div para las FAQ's */}
            <section>
                <div className="flex flex-col md:flex-row items-center justify-center md:mt-48 w-full bg-white">
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
