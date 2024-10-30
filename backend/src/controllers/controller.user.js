import serviceUser from "../services/service.user.js";

async function Register(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await serviceUser.Register(name, email, password);
    res.status(201).json(user);
}

async function Login(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await serviceUser.Login(email, password);

    if(user.length == 0)
        res.status(401).json({ error: "Email ou senha inválida" });
    else
        res.status(200).json(user);
}

async function Profile(req, res){
    const id_user = req.id_user;

    const user = await serviceUser.Profile(id_user);
    res.status(200).json(user);
}

export default { Register, Login, Profile }