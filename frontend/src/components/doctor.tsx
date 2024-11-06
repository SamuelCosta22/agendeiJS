import maleIcon from "../assets/male.png"
import femaleIcon from "../assets/female.png"

interface AppointmentProps {
    id_doctor: number,
    doctorName: string,
    specialty: string,
    icon: string,
    clickEdit: (id_doctor: number) => void,
    clickDelete: (id_doctor: number) => void,
}

export function Doctor({id_doctor, doctorName, specialty, icon, clickEdit, clickDelete}: AppointmentProps){

    return(
        <tr>
            <td><img className="w-9" src={icon == "M" ? maleIcon : femaleIcon} alt="" /></td>
            <td>{doctorName}</td>
            <td>{specialty}</td>
            <td className="text-end">
                <div className="flex gap-3">
                    <button className="btn btn-sm btn-primary" onClick={() => clickEdit(id_doctor)}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => clickDelete(id_doctor)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
}