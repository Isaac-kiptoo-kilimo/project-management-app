import { Router , Request, Response} from 'express';
import { checkCredentials, getAllUsers, loginUser,registerUserController } from '../controllers/userController';
import { verifyToken } from '../middlewares/verifyToken';

const userRouter=Router();

userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUser);
userRouter.get('/', verifyToken,getAllUsers);
userRouter.get('/checkUserDetails', verifyToken, checkCredentials);



export default userRouter;