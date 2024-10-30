import bcrypt from "bcrypt"
import repositoryUser from "../repositories/repository.user.js";
import jwt from "../token.js"

async function Register(name, email, password){
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repositoryUser.Register(name, email, hashPassword);
    user.token = jwt.CreateToken(user.id_user);             //Adicionando o token ao banco, para proteção das rotas
    return user;
}

async function Login(email, password){
    const user = await repositoryUser.ListByEmail(email);

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

async function Profile(id_user){
    const user = await repositoryUser.Profile(id_user);
    return user;
}

export default { Register, Login, Profile }