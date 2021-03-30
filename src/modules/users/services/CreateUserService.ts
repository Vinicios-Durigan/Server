import IUserRepository from '@modules/users/repositories/IUserRepository';
import {hash} from 'bcryptjs';
import User from "@modules/users/infra/typeorm/entities/User";
import  AppError from '@shared/errors/AppError';


interface IRequest {
  name: string,
  email: string,
  password: string
}

class CreateUserService {
  constructor(private userRepository: IUserRepository) { }
  async execute({ name ,email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email Address already used');
    }
    const hashPassword = await hash(password, 8)
    const user = await this.userRepository.create({
      name,
      email,
      password: hashPassword
    });


    return user;
  }
}

export default CreateUserService;