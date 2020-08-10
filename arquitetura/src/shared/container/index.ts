import { container } from 'tsyringe';

// Importing registered container's dependencies
import '@modules/users/providers';
import './providers';

// Import repository and type
import IAppointmentsRepository from '@modules/appointments/repositories/IApppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// Pass the type to ensure the variable being passed has that type
// 1 param = name to identify dependency; 2 param = actual dependency
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
