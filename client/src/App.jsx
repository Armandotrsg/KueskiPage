import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Clientes } from "./components/Clientes";
import { Navbar } from "./components/Navbar";
import { Historial } from "./components/Historial";
import { Tutorial } from "./components/Tutorial";

function App() {
    return (
        <BrowserRouter>
            <div className="flex">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/clientes" />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/historial" element={<Historial />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                    <Route path="*" element={<Navigate to="/clientes" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
