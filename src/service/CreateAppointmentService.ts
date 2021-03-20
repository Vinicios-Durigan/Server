import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import {getCustomRepository} from 'typeorm';
/** 
 * Recebimento Das Informações 
 * Tratativa de Erro
 * Acesso ao repositório
*/
interface RequestDTO{
  provider: string;
  date: Date;

}
// Dependenci Inversion
class CreateAppointmentService{

  public async  execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This Appointment is already booked');
    }
    
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    //salvando no banco de dados
    await appointmentsRepository.save(appointment)

    return appointment;
  }
}
export default CreateAppointmentService;