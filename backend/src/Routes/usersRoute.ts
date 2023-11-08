import { Router , Request, Response} from 'express';
import { checkCredentials, getAllUsers, getSingleUser, loginUser,registerUserController } from '../controllers/userController';
import { verifyToken } from '../middlewares/verifyToken';

const userRouter=Router();

userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUser);
userRouter.get('/',getAllUsers);
// userRouter.get('/:user_id', getSingleUser);
userRouter.get('/checkUserDetails', verifyToken, checkCredentials);



export default userRouter;