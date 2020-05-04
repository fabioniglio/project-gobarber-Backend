import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

import User from '../models/user';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    console.log(avatarFilename);
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only Authenticated users can change avatar', 401);
    }
    console.log(user.avatar);
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      console.log(userAvatarFilePath);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      console.log(userAvatarFileExists);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await userRepository.save(user);
    console.log(user);
    return user;
  }
}

export default UpdateUserAvatarService;
