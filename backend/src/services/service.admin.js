import bcrypt from "bcrypt"
import jwt from "../token.js"
import repositoryAdmin from "../repositories/repository.admin.js";

async function List(id_user, dtStart, dtEnd, id_doctor){
    const appointment = await repositoryAdmin.List(id_user, dtStart, dtEnd, id_doctor);
    return appointment;
}

async function AdminRegister(name, email, password){
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repositoryAdmin.AdminRegister(name, email, hashPassword);
    user.token = jwt.CreateToken(user.id_user);             //Adicionando o token ao banco, para proteção das rotas
    return user;
}

async function AdminLogin(email, password){
    const user = await repositoryAdmin.AdminListByEmail(email);

    if(user.length == 0)
        return [];
    else{
        if(await bcrypt.compare(password, user.password)){
            delete user.password;                           //Removendo o hashPassword do usuário do banco
            user.token = jwt.CreateToken(user.id_user);     //Adicionando o token ao banco, para proteção das rotas
            return user
        } else
            return [];
    }
}

async function ListUsers(){
    const users = await repositoryAdmin.ListUsers();
    return users;
}


export default { List, AdminRegister, AdminLogin, ListUsers }