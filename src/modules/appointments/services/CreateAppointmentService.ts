import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import  AppError from '@shared/errors/AppError';
/** 
 * Recebimento Das Informações 
 * Tratativa de Erro
 * Acesso ao repositório
*/
interface RequestDTO{
  provider_id: string;
  date: Date;

}
// Dependenci Inversion
class CreateAppointmentService{

  public async  execute({ date, provider_id }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This Appointment is already booked');
    }
    
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    //salvando no banco de dados
    await appointmentsRepository.save(appointment)

    return appointment;
  }
}
export default CreateAppointmentService;