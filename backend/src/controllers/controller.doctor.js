import serviceDoctor from "../services/service.doctor.js";

async function Listar(req, res) {

    const name = req.query.name;
    const doctors = await serviceDoctor.Listar(name);

    res.status(200).json(doctors);
}

async function Inserir(req, res) {

    /*
    const name = req.body.name;
    const specialty = req.body.specialty;
    const icon = req.body.icon;
    */
    const { name, specialty, icon } = req.body;

    const doctor = await serviceDoctor.Inserir(name, specialty, icon);

    res.status(201).json(doctor);
}

async function Editar(req, res) {

    const id_doctor = req.params.id_doctor;
    const { name, specialty, icon } = req.body;

    const doctor = await serviceDoctor.Editar(id_doctor, name, specialty, icon);

    res.status(200).json(doctor);
}

async function Excluir(req, res) {

    const id_doctor = req.params.id_doctor;

    const doctor = await serviceDoctor.Excluir(id_doctor);

    res.status(200).json(doctor);
}

async function ListarServicos(req, res) {

    const id_doctor = req.params.id_doctor;
    const serv = await serviceDoctor.ListarServicos(id_doctor);

    res.status(200).json(serv);
}

// async function InserirAdmin(req, res) {

//     const { id_user, id_doctor, id_service,
//         booking_date, booking_hour } = req.body;

//     const appointment = await serviceAppointment.Inserir(id_user,
//         id_doctor, id_service, booking_date, booking_hour);

//     res.status(201).json(appointment);
// }

// async function EditarAdmin(req, res) {

//     const id_appointment = req.params.id_appointment;
//     const { id_user, id_doctor, id_service,
//         booking_date, booking_hour } = req.body;

//     const appointment = await serviceAppointment.Editar(id_appointment, id_user,
//         id_doctor, id_service, booking_date, booking_hour);

//     res.status(200).json(appointment);
// }

export default { Listar, Inserir, Editar, Excluir, ListarServicos }