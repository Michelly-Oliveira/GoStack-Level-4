import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersControllers = new UsersController();
const userAvatarControllers = new UserAvatarController();

usersRouter.post('/', usersControllers.create);

// Add avatar to user - must be authenticated to do this
// url/users/avatar
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarControllers.update,
);

export default usersRouter;
