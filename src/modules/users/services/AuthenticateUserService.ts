import {compare} from 'bcryptjs';
import User from "../infra/typeorm/entities/User";
import {sign} from 'jsonwebtoken';
import auth from '@config/auth';
import  AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string,
  password: string
}
interface Response {
  user: User;
  token: string;
 }

class AuthenticateUserService{
  constructor(private userRepository: IUserRepository) { }
  public async execute({ email, password }: IRequest): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new AppError('Incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password);
   
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination')
    }

    const { secret, expiresIn } = auth.jwt
    const token = sign({}, auth.jwt.secret , {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;