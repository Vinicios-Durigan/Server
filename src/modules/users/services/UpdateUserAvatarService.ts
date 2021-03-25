import { getRepository } from "typeorm";
import uploadConfig from '@config/upload'
import User from "@modules/users/infra/typeorm/entities/User";
import fs from 'fs';
import path from 'path';
import  AppError from '@shared/errors/AppError';

interface Request {
  user_id: string,
  avatarFileName: string
}

class UpdateUserAvatarServicer {
  
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

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

    await userRepository.save(user);
    delete user.password;
    return user;

  }
}

export default UpdateUserAvatarServicer;