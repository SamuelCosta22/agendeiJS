import { query } from '../database/sqlite.js'

async function ListByUser(id_user){
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

    sql = sql + "order by a.booking_date, a.booking_hour";

    const appointment = await query(sql, filter);
    return appointment;
}

async function Insert(id_user, id_doctor, id_service, booking_date, booking_hour){
    let sql = `insert into appointments(id_user, id_doctor, id_service, booking_date, booking_hour) values(?, ?, ?, ?, ?) 
    returning id_appointment`;

    const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);

    return appointment[0];
}

export default { ListByUser, Insert }