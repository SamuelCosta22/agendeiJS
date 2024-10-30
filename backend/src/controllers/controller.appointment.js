import serviceAppointment from "../services/service.appointment.js";

async function ListByUser(req, res){
    const id_user = req.id_user;

    const appointment = await serviceAppointment.ListByUser(id_user);
    res.status(200).json(appointment);
}

async function Insert(req, res){
    const id_user = req.id_user;

    const {id_doctor, id_service, booking_date, booking_hour } = req.body;

    const appointment = await serviceAppointment.Insert(id_user, id_doctor, id_service, booking_date, booking_hour);
    res.status(201).json(appointment);
}

async function Delete(req, res){
    const id_user = req.id_user;
    const id_appointment = req.params.id_appointment;

    const appointment = await serviceAppointment.Delete(id_user, id_appointment);
    res.status(200).json(appointment);
}

export default { ListByUser, Insert, Delete }