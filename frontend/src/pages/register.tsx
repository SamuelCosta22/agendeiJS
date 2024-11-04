import logo from "../assets/logo.png"
import background from "../assets/fundo.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import api from "../constants/api";

export function Register(){

    const navigate = useNavigate();

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[password2, setPassword2] = useState("");
    const[msg, setMsg] = useState("");

    async function handleButtonRegister(){
        setMsg("")

        if(password != password2)
            return setMsg("As senhas não estão iguais. Digite novamente!")
        try {
            const response = await api.post("/admin/register", {
                name,
                email,
                password
            })
    
            if(response.data){
                localStorage.setItem("sessionToken", response.data.token)
                localStorage.setItem("sessionId", response.data.id_admin)
                localStorage.setItem("sessionEmail", email)
                localStorage.setItem("sessionName", name)

                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                navigate("/appointments")
            } else {
                setMsg("Erro ao criar conta. Tente novamente mais tarde!")
            }
        } catch (error){
            if (axios.isAxiosError(error) && error.response?.data.error)
                setMsg(error.response?.data.error)
            else
                setMsg("Erro ao criar conta. Tente novamente mais tarde!")
            console.log(error)
        }
    }

    return(
        <div className="row">
            <div className="col-sm-5 flex justify-center items-center text-center">
                <form className="w-[400px] p-4 flex flex-col items-center">
                    <img src={logo} className="w-40 mb-4" alt="Logo" />
                    <h4 className="mb-4 text-lg font-medium">Cria sua conta agora mesmo.</h4>
                    <h5 className="mb-4 text-secondary">Preencha os campos abaixo</h5>

                    <div className="mb-4 space-y-3 w-full">
                        <input type="text" placeholder="Nome" className="form-control" onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Senha" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirme a senha" className="form-control" onChange={(e) => setPassword2(e.target.value)} />
                        <button type="button" className="btn btn-primary w-[100%] mt-4" onClick={handleButtonRegister}>Criar minha conta</button>
                    </div>

                    {
                        msg.length > 0 && (
                            <div className="my-1 flex">
                                <span className="alert alert-danger" role="alert">{msg}</span>
                            </div>
                        )
                    }

                    <div className="mt-4">
                        <span>Já tenho uma conta. </span>
                        <Link to="/" className="text-[#0D6EFD] underline">Acessar agora!</Link>
                    </div>
                </form>
            </div>

            <div className="col-sm-7 flex">
                <img src={background} className="object-cover w-full h-[100vh] object-left" alt="Background" />
            </div>
        </div>
    )
}