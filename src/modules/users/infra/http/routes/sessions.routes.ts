// express
import Routes, { request, response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
//--------------------Code------------------------
const sessionsRoutes = Routes();

//getAll Agendamentos 

sessionsRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const userRepository = new UserRepository();
    const authenticateUser = new AuthenticateUserService(userRepository);

    const { user, token} = await authenticateUser.execute({
      email,
      password
    });

    delete user.password;
     
    return response.json({ user, token });
  } catch(err) {
    return response.status(400).json({ error: err.message });
  } 
});

export default sessionsRoutes;
  
