import repositoryAppointment from "../repositories/repository.appointment.js";

async function ListByUser(id_user){
    const appointment = await repositoryAppointment.ListByUser(id_user);
    return appointment;
}

async function Insert(id_user, id_doctor, id_service, booking_date, booking_hour){
    const appointment = await repositoryAppointment.Insert(id_user, id_doctor, id_service, booking_date, booking_hour);
    return appointment;
}

export default { ListByUser, Insert }