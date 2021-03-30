import uploadConfig from '@config/upload'
import User from "@modules/users/infra/typeorm/entities/User";
import fs from 'fs';
import path from 'path';
import  AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";

interface IRequest {
  user_id: string,
  avatarFileName: string
}

class UpdateUserAvatarServicer {
  constructor(private userRepository: IUserRepository) { }

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('only authenticated users can change Avatar ')
    }

    //se existe um avatar delete o anterior
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName;

    this.userRepository.save(user);

    return user;

  }
}

export default UpdateUserAvatarServicer;