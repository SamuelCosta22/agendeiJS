import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Appointments } from "./pages/appointments";
import { AppointmentAdd } from "./pages/appointment-add";


export function RoutesComponent(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/add" element={<AppointmentAdd />} />
                <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} />
            </Routes>
        </BrowserRouter>
    )
}