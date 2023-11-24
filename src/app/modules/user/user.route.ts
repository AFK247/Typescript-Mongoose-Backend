import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router
  .post('/', UserController.createUser)
  .get('/', UserController.getAllUsers);

router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateSingleUser);
router.delete('/:userId', UserController.deleteSingleUser);

export const UserRoutes = router;
