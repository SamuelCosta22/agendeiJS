import { Link, useParams } from "react-router-dom"
import { NavBar } from "../components/navbar"
import { doctors, doctors_services } from "../constants/data"

export function AppointmentAdd(){
    const {id_appointment} = useParams<{ id_appointment: string }>();

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
                            <label htmlFor="doctor" className="form-label">Médico</label>
                            <div className="form-control mb-2">
                                <select name="doctor" id="doctor">
                                    <option value="0">Selecione o médico</option>
                                    {
                                        doctors.map((doc) => {
                                            return(
                                                <option key={doc.id_doctor} value={doc.id_doctor}>{doc.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="service" className="form-label">Serviço</label>
                            <div className="form-control mb-2">
                                <select name="service" id="service">
                                    <option value="0">Selecione o serviço</option>
                                    {
                                        doctors_services.map((doc_serv) => {
                                            return(
                                                <option key={doc_serv.id_service} value={doc_serv.id_service}>{doc_serv.description}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="col-6">
                                <label htmlFor="bookingDate" className="form-label">Data</label>
                                <input type="date"className="form-control" name="bookingDate" id="bookingDate" />
                            </div>
                            <div className="col-5">
                                <label htmlFor="bookingHour" className="form-label">Hora</label>
                                <input type="time"className="form-control" name="bookingHour" id="bookingHour" />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-8 xs:mb-8">
                        <div className="flex justify-end gap-4 xs:items-center xs:justify-center">
                            <Link  to="/appointments" className="btn btn-danger">Cancelar</Link>
                            <button className="btn btn-primary">Salvar Dados</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}