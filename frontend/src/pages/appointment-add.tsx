import { Link, useNavigate, useParams } from "react-router-dom"
import { NavBar } from "../components/navbar"
import { useEffect, useState } from "react";
import api from "../constants/api";
import axios from "axios";

type UsersProps = {
    id_user: number,
    name: string,
}

type DoctorsProps = {
    id_doctor: number,
    name: string,
}

type ServicesProps = {
    id_service: number,
    description: string
}

export function AppointmentAdd(){
    const {id_appointment} = useParams<{ id_appointment: string | undefined }>();

    const [users, setUsers] = useState<UsersProps[]>([]);
    const [doctors, setDoctors] = useState<DoctorsProps[]>([]);
    const [services, setServices] = useState<ServicesProps[]>([]);

    const [idUser, setIdUser] = useState("");
    const [idDoctor, setIdDoctor] = useState(0);
    const [idService, setIdService] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingHour, setBookingHour] = useState("");

    const navigate = useNavigate()

    async function loadUsers() {
        try {
            const response = await api.get("/admin/users");

            if (response.data) {
                setUsers(response.data);
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar pacientes");
        }
    }

    async function loadDoctors() {
        try {
            const response = await api.get("/doctors");

            if (response.data) {
                setDoctors(response.data);

                //Edit Mode
                const appointmentId = parseInt(id_appointment ?? "0", 10);
                if(appointmentId > 0)
                    loadAppointment(appointmentId)
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar médicos.");
        }
    }

    async function loadServices(id: number) {
        try {
            const response = await api.get("/doctors/" + id + "/services");

            if (response.data) {
                setServices(response.data);
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");
                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar os serviços.");
        }
    }

    async function loadAppointment(id: number) {
        try {
            const response = await api.get("/admin/appointments/" + id);

            if (response.data) {
                setIdUser(response.data.id_user);
                setIdDoctor(response.data.id_doctor);
                setIdService(response.data.id_service);
                setBookingDate(response.data.booking_date);
                setBookingHour(response.data.booking_hour);
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");
                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar os serviços.");
        }
    }

    async function handleClickSave(){
        const json = {
            id_user: idUser,
            id_doctor: idDoctor,
            id_service: idService,
            booking_date: bookingDate,
            booking_hour: bookingHour,
        };

        try {
            const appointmentId = parseInt(id_appointment ?? "0", 10);
            const response = appointmentId > 0 ? 
                await api.put("admin/appointments/" + appointmentId, json) :
                await api.post("admin/appointments", json)
            if(response.data){
                navigate("/appointments");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao salvar os dados.");
        }
        console.log(idUser, idDoctor, idService, bookingDate, bookingHour)
    }

    useEffect(() => {
        loadUsers();
        loadDoctors();
    }, []);

    useEffect(() => {
        loadServices(idDoctor);
    }, [idDoctor])

    return(
        <>
            <NavBar />
            <div className="container-fluid mt-[90px]">
                <div className="row col-lg-4 offset-lg-4">
                    <div className="col-12">
                        <h2 className="text-2xl font-bold mb-2 xs:text-center">
                            {
                                id_appointment && parseInt(id_appointment) > 0
                                    ? "Editar Agendamento"
                                    : "Novo Agendamento"
                            }
                        </h2>
                    </div>

                    <div className="space-y-4 mt-4">
                        <div className="col-12">
                            <label htmlFor="user" className="form-label">Paciente</label>
                            <div className="form-control mb-2">
                                <select name="user" id="user"
                                    value={idUser} onChange={(e) => setIdUser(e.target.value)} >
                                    <option value="0">Selecione o paciente</option>

                                    {
                                        users.map(u => {
                                            return <option key={u.id_user} value={u.id_user}>{u.name}</option>
                                        })}

                                </select>
                            </div>
                        </div>

                        <div className="col-12 ">
                            <label htmlFor="doctor" className="form-label">Médico</label>
                            <div className="form-control mb-2">
                                <select name="doctor" id="doctor"
                                    value={idDoctor} onChange={(e) => setIdDoctor(Number(e.target.value))} >
                                    <option value="0">Selecione o médico</option>

                                    {doctors.map(d => {
                                        return <option key={d.id_doctor} value={d.id_doctor}>{d.name}</option>
                                    })}

                                </select>
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="service" className="form-label">Serviço</label>
                            <div className="form-control mb-2">
                                <select name="service" id="service" value={idService} onChange={(e) => setIdService(e.target.value)}>
                                    <option value="0">Selecione o serviço</option>
                                    {
                                        services.map((service) => {
                                            return(
                                                <option key={service.id_service} value={service.id_service}>{service.description}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="col-6">
                                <label htmlFor="bookingDate" className="form-label">Data</label>
                                <input type="date"className="form-control" name="bookingDate" id="bookingDate" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                            </div>
                            <div className="col-5">
                                <label htmlFor="bookingHour" className="form-label">Hora</label>
                                <input type="time"className="form-control" name="bookingHour" id="bookingHour" value={bookingHour} onChange={(e) => setBookingHour(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-8 xs:mb-8">
                        <div className="flex justify-end gap-4 xs:items-center xs:justify-center">
                            <Link  to="/appointments" className="btn btn-danger">Cancelar</Link>
                            <button className="btn btn-primary" type="button" onClick={handleClickSave}>Salvar Dados</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}