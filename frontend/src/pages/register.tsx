import logo from "../assets/logo.png"
import background from "../assets/fundo.png"
import { Link } from "react-router-dom"

export function Register(){

    function handleButtonRegister(){

    }

    return(
        <div className="row">
            <div className="col-sm-5 flex justify-center items-center text-center">
                <form className="w-[400px] p-4 flex flex-col items-center">
                    <img src={logo} className="w-40 mb-4" alt="Logo" />
                    <h4 className="mb-4 text-lg font-medium">Cria sua conta agora mesmo.</h4>
                    <h5 className="mb-4 text-secondary">Preencha os campos abaixo</h5>

                    <div className="mb-4 space-y-3 w-full">
                        <input type="text" placeholder="Nome" className="form-control" />
                        <input type="email" placeholder="Email" className="form-control" />
                        <input type="password" placeholder="Senha" className="form-control" />
                        <input type="password" placeholder="Confirme a senha" className="form-control" />
                        <button type="button" className="btn btn-primary w-[100%] mt-4" onClick={handleButtonRegister}>Criar minha conta</button>
                    </div>

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