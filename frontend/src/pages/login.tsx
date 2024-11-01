import logo from "../assets/logo.png"
import background from "../assets/fundo.png"
import { Link, useNavigate } from "react-router-dom"

export function Login(){
    const navigate = useNavigate();
    function handleButtonLogin(){
        navigate("/appointments")
    }

    return(
        <div className="row">
            <div className="col-sm-5 flex justify-center items-center text-center">
                <form className="w-[400px] p-4 flex flex-col items-center">
                    <img src={logo} className="w-40 mb-4" alt="Logo" />
                    <h4 className="mb-4 text-lg font-medium">Gerencie seus agendamentos de forma descomplicada.</h4>
                    <h5 className="mb-4 text-secondary">Acesse sua conta</h5>

                    <div className="mb-4 space-y-3 w-full">
                        <input type="email" placeholder="Email" className="form-control" />
                        <input type="password" placeholder="Senha" className="form-control" />
                        <button type="button" className="btn btn-primary w-[100%] mt-4" onClick={handleButtonLogin}>Login</button>
                    </div>

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