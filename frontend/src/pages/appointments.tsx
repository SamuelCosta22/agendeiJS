import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { Appointment } from "../components/appointment";
import React, { useEffect, useState } from "react";
import api from "../constants/api";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

type AppointmentsProps = {
    id_appointment: number;
    user: string;
    doctor: string;
    service: string;
    booking_date: string;
    booking_hour: string;
    price: number;
};

type DoctorsProps = {
    id_doctor: number,
    name: string,
}

export function Appointments(){
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);
    const [doctors, setDoctors] = useState<DoctorsProps[]>([]);

    //Filtragem
    const [idDoctor, setIdDoctor] = useState("");
    const [dtStart, setDtStart] = useState("");
    const [dtEnd, setDtEnd] = useState("");

    function handleClickEdit(id_appointment: number){
        navigate("/appointments/edit/" + id_appointment)
    }
    function handleClickDelete(id_appointment: number){
        confirmAlert({
            title: "Exclusão",
            message: "Confirmar exclusão deste agendamento?",
            buttons: [
                {
                    label: "Sim",
                    onClick: () => deleteAppointment(id_appointment)
                },
                {
                    label: "Não",
                    onClick: () => {}
                }
            ]
        })
    }
    
    async function loadAppointments(){
        console.log("Loading Appointments...")
        try{
            const response = await api.get("/admin/appointments", {
                params: {
                    id_doctor: idDoctor,
                    dt_start: dtStart,
                    dt_end: dtEnd,
                }
            })
            if(response.data){
                setAppointments(response.data)
            }
        } catch (error){
            if (axios.isAxiosError(error) && error.response?.data.error){
                if(error.response.status == 401)
                    return navigate("/");
                alert(error.response?.data.error)
            }
            else
                alert("Erro ao efetuar login. Tente novamente mais tarde!")
            console.log(error)
        }
    }

    async function loadDoctors(){
        try{
            const response = await api.get("/doctors")
            if(response.data){
                setDoctors(response.data)
            }
        } catch (error){
            if (axios.isAxiosError(error) && error.response?.data.error){
                if(error.response.status == 401)
                    return navigate("/");
                alert(error.response?.data.error)
            } else
                alert("Erro ao listar os médicos. Tente novamente mais tarde!")
            console.log(error)
        }
    }

    async function deleteAppointment(id_appointment: number){
        try{
            const response = await api.delete("/appointments/" + id_appointment)
            if(response.data){
                loadAppointments();
            }
        } catch (error){
            if (axios.isAxiosError(error) && error.response?.data.error){
                if(error.response.status == 401)
                    return navigate("/");
                alert(error.response?.data.error)
            } else
                alert("Erro ao excluir os dados. Tente novamente mais tarde!")
            console.log(error)
        }
    }

    function handleChangeDoctor(e: React.ChangeEvent<HTMLSelectElement>){
        setIdDoctor(e.target.value)
    }

    useEffect(() => {
        loadAppointments()
        loadDoctors()
    }, [])

    return(
        <div className="container-fluid mt-[90px]">
            <NavBar />

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <h2 className="text-xl font-bold">Agendamentos</h2>
                    <Link to="/appointments/add" className="btn btn-outline-primary">Novo Agendamento</Link>
                </div>

                <div className="flex justify-end items-center gap-3">
                    <input type="date" id="startDate" className="form-control" onChange={(e) => setDtStart(e.target.value)} />
                    <span>Até</span>
                    <input type="date" id="endDate" className="form-control" onChange={(e) => setDtEnd(e.target.value)} />
                    <div className="form-control">
                        <select name="doctor" id="doctor" value={idDoctor} onChange={handleChangeDoctor}>
                            <option value="">Todos os médicos</option>
                            {
                                doctors.map((doc) => {
                                    return(
                                        <option key={doc.id_doctor} value={doc.id_doctor}>{doc.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button className="btn btn-primary" type="button" onClick={loadAppointments}>Filtrar</button>
                </div>
            </div>

            <div className="h-[1px] mt-10 bg-gray-300"></div>

            <div className="mt-1">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Paciente</th>
                            <th scope="col">Médico</th>
                            <th scope="col">Serviço</th>
                            <th scope="col">Data/Hora</th>
                            <th scope="col">Valor</th>
                            <th scope="col" className="w-28"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((appoin) => {
                                return <Appointment
                                    key={appoin.id_appointment}
                                    id_appointment={appoin.id_appointment}
                                    user={appoin.user}
                                    doctor={appoin.doctor}
                                    service={appoin.service}
                                    booking_date={appoin.booking_date}
                                    booking_hour={appoin.booking_hour}
                                    price={appoin.price}
                                    clickEdit={handleClickEdit}
                                    clickDelete={() => handleClickDelete(appoin.id_appointment)}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}