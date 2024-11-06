import { Link, useNavigate } from "react-router-dom"
import { NavBar } from "../components/navbar"
import { useState } from "react";
import api from "../constants/api";
import axios from "axios";

export function DoctorsAdd(){
    const [idDoctor, setIdDoctor] = useState("");
    const [idSpecialty, setIdSpecialty] = useState("");
    const [idIcon, setIdIcon] = useState("");

    const navigate = useNavigate()

    async function handleClickSave(){
        const nameDoctor = idDoctor.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const nameSpecialty = idSpecialty.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const upperCaseIcon = typeof idIcon === "string" ? idIcon.toUpperCase() : String(idIcon).toUpperCase();

        const json = {
            name: nameDoctor,
            specialty: nameSpecialty,
            icon: upperCaseIcon
        };

        try {
            const response = await api.post("doctors/", json)
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
        console.log(nameDoctor, nameSpecialty, upperCaseIcon)
    }

    return(
        <>
            <NavBar />
            <div className="container-fluid mt-[90px]">
                <div className="row col-lg-4 offset-lg-4">
                    <div className="col-12">
                        <h2 className="text-2xl font-bold mb-2 xs:text-center">Novo Médico</h2>
                    </div>

                    <div className="space-y-4 mt-4">
                        <div className="col-12">
                            <label htmlFor="icon" className="form-label">Médico</label>
                            <div className="form-control mb-2">
                                <input className="w-full outline-none" type="text" placeholder="Nome do Médico" onChange={(e) => setIdDoctor(e.target.value)} />
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="icon" className="form-label">Especialidade</label>
                            <div className="form-control mb-2">
                                <input className="w-full outline-none" type="text" placeholder="Especialidade(s) do Médico" onChange={(e) => setIdSpecialty(e.target.value)} />
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