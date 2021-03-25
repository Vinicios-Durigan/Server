// express
import Routes, { request, response } from 'express';
//Libis extras
import {getCustomRepository} from 'typeorm';
import { parseISO } from 'date-fns';
//Repositorios
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';


//--------------------Code------------------------
const appointmentsRouter = Routes();
//getAll Agendamentos 
//verefica se está utenticado
appointmentsRouter.use(ensureAthentication);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = await appointmentsRepository.find();
  return response.json(appointment);

});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    //transformacào de dados
    const parseDate = (parseISO(date));
    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({date:parseDate,provider_id})
    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
  
