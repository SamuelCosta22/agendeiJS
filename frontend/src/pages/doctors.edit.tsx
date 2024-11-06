import { Link, useNavigate, useParams } from "react-router-dom"
import { NavBar } from "../components/navbar"
import { useEffect, useState } from "react";
import api from "../constants/api";
import axios from "axios";

type DoctorsProps = {
    id_doctor: number,
    name: string,
}

type ServicesProps = {
    id_service: number,
    description: string
}

export function DoctorsEdit(){
    const {id_doctor} = useParams<{ id_doctor: string | undefined }>();
    const [doctors, setDoctors] = useState<DoctorsProps[]>([]);
    const [services, setServices] = useState<ServicesProps[]>([]);

    const [idUser, setIdUser] = useState("");
    const [idDoctor, setIdDoctor] = useState("");
    const [idSpecialty, setIdSpecialty] = useState("");
    const [idIcon, setIdIcon] = useState("");

    const navigate = useNavigate()

    async function loadDoctors() {
        try {
            const response = await api.get("/doctors");

            if (response.data) {
                setDoctors(response.data);

                //Edit Mode
                const idDoctor = parseInt(id_doctor ?? "0", 10);
                if(idDoctor > 0)
                    loadAppointment(idDoctor)
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

    async function loadSpecialty(id: number) {
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
                alert("Erro ao listar as especialidades.");
        }
    }

    async function loadAppointment(id: number) {
        try {
            const response = await api.get("/admin/appointments/" + id);

            if (response.data) {
                setIdUser(response.data.id_user);
                setIdDoctor(response.data.id_doctor);
                setIdSpecialty(response.data.id_service);
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
            id_specialty: idSpecialty,
            icon: idIcon
        };

        try {
            const idDoctor = parseInt(id_doctor ?? "0", 10);
            const response = idDoctor > 0 ? 
                await api.put("doctors/" + id_doctor, json) :
                await api.post("doctors/", json)
            if(response.data){
                navigate("/doctors");
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
        console.log(idUser, idDoctor, idSpecialty, idIcon)
    }

    useEffect(() => {
        loadDoctors();
    }, []);

    useEffect(() => {
        loadSpecialty(parseInt(idDoctor));
    }, [idDoctor])

    return(
        <>
            <NavBar />
            <div className="container-fluid mt-[90px]">
                <div className="row col-lg-4 offset-lg-4">
                    <div className="col-12">
                        <h2 className="text-2xl font-bold mb-2 xs:text-center">
                            {
                                id_doctor && parseInt(id_doctor) > 0
                                    ? "Editar Médico"
                                    : "Novo Médico"
                            }
                        </h2>
                    </div>

                    <div className="space-y-4 mt-4">
                        <div className="col-12 ">
                            <label htmlFor="doctor" className="form-label">Médico</label>
                            <div className="form-control mb-2">
                                <select name="doctor" id="doctor"
                                    value={idDoctor} onChange={(e) => setIdDoctor(e.target.value)} >
                                    <option value="0">Selecione o médico</option>

                                    {doctors.map(d => {
                                        return <option key={d.id_doctor} value={d.id_doctor}>{d.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="specialty" className="form-label">Especialidade</label>
                            <div className="form-control mb-2">
                                <select name="specialty" id="specialty" value={idSpecialty} onChange={(e) => setIdSpecialty(e.target.value)}>
                                    <option value="0">Selecione a especialidade</option>
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

                        <div className="col-12">
                            <label htmlFor="icon" className="form-label">Tipo</label>
                            <div className="form-control mb-2">
                                <input className="w-full outline-none" type="text" placeholder="Escrever apenas M ou F, maiúsculo" onChange={(e) => setIdIcon(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-8 xs:mb-8">
                        <div className="flex justify-end gap-4 xs:items-center xs:justify-center">
                            <Link to="/doctors" className="btn btn-danger">Cancelar</Link>
                            <button className="btn btn-primary" type="button" onClick={handleClickSave}>Salvar Dados</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}