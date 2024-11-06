import serviceAdmin from "../services/service.admin.js";

async function List(req, res){
    const dtStart = req.query.dtStart;
    const dtEnd = req.query.dtEnd;
    const id_doctor = req.query.id_doctor;

    const appointment = await serviceAdmin.List(0, dtStart, dtEnd, id_doctor);
    res.status(200).json(appointment);
}

async function AdminRegister(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await serviceAdmin.AdminRegister(name, email, password);
    res.status(201).json(user);
}

async function AdminLogin(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await serviceAdmin.AdminLogin(email, password);

    if(user.length == 0)
        res.status(401).json({ error: "Email ou senha inválida" });
    else
        res.status(200).json(user);
}

async function ListUsers(req, res){
    const users = await serviceAdmin.ListUsers();
    res.status(200).json(users);
}

export default { List, AdminRegister, AdminLogin, ListUsers }