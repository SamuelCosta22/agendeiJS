import jwt from "jsonwebtoken";

const secretToken = "jornadaJS2024";

function CreateToken(id_user){
    const token = jwt.sign({id_user}, secretToken, {
        expiresIn: 999999
    });

    return token;
}

function ValidateToken(req, res, next){
    const authToken = req.headers.authorization;     //Resposta vem no formato "Bearer 00000000"

    if(!authToken)
        return res.status(401).json({error: "Token não informado"});

    const [bearer, token] = authToken.split(" ");   //Pegando o "Bearer 00000000" e dividindo bearer="Bearer" e token="00000000"
    
    jwt.verify(token, secretToken, (err, tokenDecoded) => {
        if(err)
            return res.status(401).json({error: "Token inválido"});
        req.id_user = tokenDecoded.id_user;
        next();
    });
}

export default { CreateToken, ValidateToken }