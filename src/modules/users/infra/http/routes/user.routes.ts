// express
import Routes, { request, response } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import createUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarServicer from '@modules/users/services/UpdateUserAvatarService';
//--------------------Code------------------------
const usersRouter = Routes();
const upload = multer(uploadConfig);
//getAll Agendamentos 


usersRouter.post('/', async (request, response) => {
  try {
  
    const { name, email, password } = request.body;
    const createUser = new createUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password;
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch('/avatar',ensureAuthenticated, upload.single('avatar'),
  async (request, response) => {
    try {

      const updateUserAvatar = new UpdateUserAvatarServicer();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename
      });

      return response.json(user)
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  });


export default usersRouter;
  
