import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Appointments } from "./pages/appointments";

export function RoutesComponent(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/appointments" element={<Appointments />} />
            </Routes>
        </BrowserRouter>
    )
}