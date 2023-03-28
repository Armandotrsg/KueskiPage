export const Tutorial = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold ml-4">Tutorial</h1>
            <div class="flex items-center justify-center h-screen bg-gray-100">
            {/*Div para la posición del video*/}
            <div class="w-4/5 md:w-2/3 lg:w-2/3 h-96">
                {/*Estilo cuadro donde se muestra el video*/}
                <video class="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700" muted controls>
                {/*Ruta al  video*/}
                <source src="src\assets\img\video_tutorial.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
                </video>
            </div>
            </div>
        </div>
    )
}