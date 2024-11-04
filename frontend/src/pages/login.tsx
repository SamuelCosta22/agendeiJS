import logo from "../assets/logo.png"
import background from "../assets/fundo.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import api from "../constants/api";

export function Login(){
    const navigate = useNavigate();

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[msg, setMsg] = useState("");

    async function handleButtonLogin(){
        setMsg("")
        try {
            const response = await api.post("/admin/login", {
                email,
                password
            })
    
            if(response.data){
                localStorage.setItem("sessionToken", response.data.token)
                localStorage.setItem("sessionId", response.data.id_admin)
                localStorage.setItem("sessionEmail", response.data.email)
                localStorage.setItem("sessionName", response.data.name)

                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                navigate("/appointments")
            } else {
                setMsg("Erro ao efetuar login. Tente novamente mais tarde!")
            }
        } catch (error){
            if (axios.isAxiosError(error) && error.response?.data.error)
                setMsg(error.response?.data.error)
            else
                setMsg("Erro ao efetuar login. Tente novamente mais tarde!")
            console.log(error)
        }
    }

    return(
        <div className="row">
            <div className="col-sm-5 flex justify-center items-center text-center">
                <form className="w-[400px] p-4 flex flex-col items-center">
                    <img src={logo} className="w-40 mb-4" alt="Logo" />
                    <h4 className="mb-4 text-lg font-medium">Gerencie seus agendamentos de forma descomplicada.</h4>
                    <h5 className="mb-4 text-secondary">Acesse sua conta</h5>

                    <div className="mb-4 space-y-3 w-full">
                        <input type="email" placeholder="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Senha" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="btn btn-primary w-[100%] mt-4" onClick={handleButtonLogin}>Login</button>
                    </div>

                    {
                        msg.length > 0 && (
                            <div className="my-1 flex">
                                <span className="alert alert-danger" role="alert">{msg}</span>
                            </div>
                        )
                    }

                    <div className="mt-4">
                        <span>Não tenho uma conta. </span>
                        <Link to="/register" className="text-[#0D6EFD] underline">Criar agora!</Link>
                    </div>
                </form>
            </div>

            <div className="col-sm-7 flex">
                <img src={background} className="object-cover w-full h-[100vh] object-left" alt="Background" />
            </div>
        </div>
    )
}