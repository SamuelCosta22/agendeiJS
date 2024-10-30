import repositoryAppointment from "../repositories/repository.appointment.js";

async function ListByUser(id_user){
    const appointment = await repositoryAppointment.ListByUser(id_user);
    return appointment;
}

async function Insert(id_user, id_doctor, id_service, booking_date, booking_hour){
    const appointment = await repositoryAppointment.Insert(id_user, id_doctor, id_service, booking_date, booking_hour);
    return appointment;
}

async function Delete(id_user, id_appointment){
    const appointment = await repositoryAppointment.Delete(id_user, id_appointment);
    return appointment;
}

export default { ListByUser, Insert, Delete }