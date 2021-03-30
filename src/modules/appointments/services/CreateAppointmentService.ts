import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import { startOfHour } from 'date-fns';
/** 
 * Recebimento Das Informações 
 * Tratativa de Erro
 * Acesso ao repositório
*/
interface IRequest{
  provider_id: string;
  date: Date;

}
// Dependenci Inversion
class CreateAppointmentService{

  constructor(private appointmentRepository: IAppointmentsRepository) {
    
  }

  public async  execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This Appointment is already booked');
    }
    
    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate
    });


    return appointment;
  }
}
export default CreateAppointmentService;