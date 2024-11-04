import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointment from "./controllers/controller.appointment.js";

import jwt from './token.js'
import controllerAdmin from "./controllers/controller.admin.js";

const router = Router();

//Doctors
router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
router.put("/doctors/:id_doctor", jwt.ValidateToken, controllerDoctor.Editar);
router.delete("/doctors/:id_doctor", jwt.ValidateToken, controllerDoctor.Excluir);

//Services
router.get("/doctors/:id_doctor/services", jwt.ValidateToken, controllerDoctor.ListServices);

//Users
router.post("/users/register", controllerUser.Register);
router.post("/users/login", controllerUser.Login);
router.get("/users/profile", jwt.ValidateToken, controllerUser.Profile);

//Admins
router.post("/admin/register", controllerAdmin.AdminRegister);
router.post("/admin/login", controllerAdmin.AdminLogin);
router.get("/admin/appointments", jwt.ValidateToken, controllerAdmin.List);

//Appointments
router.get("/appointments", jwt.ValidateToken, controllerAppointment.ListByUser);
router.post("/appointments", jwt.ValidateToken, controllerAppointment.Insert);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.Delete);


export default router;