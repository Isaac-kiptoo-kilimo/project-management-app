import { Router , Request, Response} from 'express';
import { checkCredentials, getAllUsers, loginUser, registerUser } from '../controllers/userController';
import { verifyToken } from '../middlewares/verifyToken';

const userRouter=Router();

userRouter.post('/register', registerUser);
// userRouter.post('/login',(req:Request,res:Response)=>{
//     console.log('You are logging in')
// });
userRouter.post('/login', loginUser);
userRouter.get('/', verifyToken,getAllUsers);
userRouter.get('/checkUserDetails', verifyToken, checkCredentials);



export default userRouter;