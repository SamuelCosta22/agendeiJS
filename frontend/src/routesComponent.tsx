import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Appointments } from "./pages/appointments";
import { AppointmentAdd } from "./pages/appointment-add";
import { Doctors } from "./pages/doctors";
import { DoctorsAdd } from "./pages/doctors-add";
import { DoctorsEdit } from "./pages/doctors.edit";


export function RoutesComponent(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/add" element={<AppointmentAdd />} />
                <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/add" element={<DoctorsAdd />} />
                <Route path="/doctors/edit/:id_doctor" element={<DoctorsEdit />} />
            </Routes>
        </BrowserRouter>
    )
}