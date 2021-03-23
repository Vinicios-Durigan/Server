import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import sessionsRoutes from './sessions.routes';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoutes);

export default routes;