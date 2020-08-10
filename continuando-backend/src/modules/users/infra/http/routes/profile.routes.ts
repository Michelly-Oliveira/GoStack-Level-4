import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileControllers = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileControllers.show);
profileRouter.put('/', profileControllers.update);

export default profileRouter;
