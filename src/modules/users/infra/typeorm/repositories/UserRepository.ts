//model
import User from '@modules/users/infra/typeorm/entities/User';
//libs externas
import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/users/infra/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class UserRepository implements IUserRepository{
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }
  
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
    
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });
    return user;
  }
  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
  

}

export default UserRepository;