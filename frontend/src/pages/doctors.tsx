import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { useEffect, useState } from "react";
import api from "../constants/api";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Doctor } from "../components/doctor";

type DoctorsProps = {
    id_doctor: number,
    name: string,
    specialty: string,
    icon: string,
    clickEdit: (id_doctor: number) => void,
    clickDelete: (id_doctor: number) => void,
}

export function Doctors(){
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<DoctorsProps[]>([]);

    function handleClickEdit(id_doctor: number){
        navigate("/doctors/edit/" + id_doctor)
    }

    function handleClickDelete(id_doctor: number){
        confirmAlert({
            title: "Exclusão",
            message: "Confirmar exclusão deste médico?",
            buttons: [
                {
                    label: "Sim",
                    onClick: () => deleteDoctor(id_doctor)
                },
                {
                    label: "Não",
                    onClick: () => {}
                }
            ]
        })
    }
    
    // async function loadAppointments(){
    //     console.log("Loading Appointments...")
    //     try{
    //         const response = await api.get("/doctors")
    //         if(response.data){
    //             setDoctors(response.data)
    //         }
    //     } catch (error){
    //         if (axios.isAxiosError(error) && error.response?.data.error){
    //             if(error.response.status == 401)
    //                 return navigate("/");
    //             alert(error.response?.data.error)
    //         }
    //         else
    //             alert("Erro ao efetuar login. Tente novamente mais tarde!")
    //         console.log(error)
    //     }
    // }

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

    async function deleteDoctor(id_doctor: number){
        try{
            const response = await api.delete("/doctors/" + id_doctor)
            if(response.data){
                loadDoctors();
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

    useEffect(() => {
        loadDoctors()
        console.log(doctors[0])
    }, [])

    return(
        <div className="container-fluid mt-[90px]">
            <NavBar />

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <h2 className="text-xl font-bold">Médicos</h2>
                    <Link to="/doctors/add" className="btn btn-outline-primary">Novo Cadastro de Médico</Link>
                </div>
            </div>

            <div className="h-[1px] mt-10 bg-gray-300"></div>

            <div className="mt-1">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Tipo</th>
                            <th scope="col">Médico</th>
                            <th scope="col">Especialidade</th>
                            <th scope="col" className="w-28">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doc) => {
                                return <Doctor
                                    key={doc.id_doctor}
                                    id_doctor={doc.id_doctor}
                                    icon={doc.icon}
                                    doctorName={doc.name}
                                    specialty={doc.specialty}
                                    clickEdit={handleClickEdit}
                                    clickDelete={() => handleClickDelete(doc.id_doctor)}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}