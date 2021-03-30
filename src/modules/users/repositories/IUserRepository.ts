import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../infra/dtos/ICreateUserDTO';

export default interface IUserRepository{

  findById(id: String): Promise<User | undefined>;
  findByEmail(email: String): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
