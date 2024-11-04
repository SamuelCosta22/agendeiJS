interface AppointmentProps {
    id_appointment: number,
    user: string,
    doctor: string,
    service: string,
    booking_date: string,
    booking_hour: string,
    price: number,
    clickEdit: (id_appointment: number) => void,
    clickDelete: (id_appointment: number) => void,

}

export function Appointment({id_appointment, user, doctor, service, booking_date, booking_hour, price, clickEdit, clickDelete}: AppointmentProps){

    const dt = new Date(booking_date + "T" + booking_hour)

    return(
        <tr>
            <td>{user}</td>
            <td>{doctor}</td>
            <td>{service}</td>
            <td>{new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short'}).format(dt)} às {booking_hour}</td>
            <td>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price)}</td>
            <td className="text-end">
                <div className="flex gap-3">
                    <button className="btn btn-sm btn-primary" onClick={() => clickEdit(id_appointment)}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => clickDelete(id_appointment)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
}