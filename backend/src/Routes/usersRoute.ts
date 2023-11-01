import { Router } from 'express';
import { checkCredentials, getAllUsers, loginUser, registerUser } from '../controllers/userController';
import { verifyToken } from '../middlewares/verifyToken';

const userRouter=Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', verifyToken,getAllUsers);
userRouter.get('/checkUserDetails', verifyToken, checkCredentials);



export default userRouter;