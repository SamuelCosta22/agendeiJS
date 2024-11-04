import { query } from '../database/sqlite.js'

async function List(id_user, dtStart, dtEnd, id_doctor){
    let filter = [];

    let sql = `select a.id_appointment, s.description as service, d.name as doctor, d.specialty,
    a.booking_date, a.booking_hour, u.name as user, ds.price, a.id_doctor, a.id_service, a.id_user
    from appointments a
    join services s on (s.id_service = a.id_service)
    join doctors d on (d.id_doctor = a.id_doctor)
    join users u on (u.id_user = a.id_user)
    join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
    where a.id_appointment > 0 `;

    if (id_user) {
        filter.push(id_user);
        sql = sql + "and a.id_user = ? "
    }

    if(dtStart){
        filter.push(dtStart);
        sql = sql + "and a.booking_date >= ? "
    }

    if(dtEnd){
        filter.push(dtEnd);
        sql = sql + "and a.booking_date <= ? "
    }

    if(id_doctor){
        filter.push(id_doctor);
        sql = sql + "and a.id_doctor = ? "
    }

    sql = sql + "order by a.booking_date, a.booking_hour";

    const appointment = await query(sql, filter);
    return appointment;
}

async function AdminRegister(name, email, password){
    let sql = `insert into admins(name, email, password) values(?, ?, ?) 
    returning id_admin`;

    const admin = await query(sql, [name, email, password]);

    return admin[0];
}

async function AdminListByEmail(email){
    let sql = `select * from admins where email = ?`;

    const admin = await query(sql, [email]);

    if(admin.length == 0)
        return [];
    else
        return admin[0];
}

export default { List, AdminRegister, AdminListByEmail }