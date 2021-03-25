//model
import Appointment from '../infra/typeorm/entities/Appointment';
//libs externas
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

  //procurar por data expecifica
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }

}

export default AppointmentsRepository;