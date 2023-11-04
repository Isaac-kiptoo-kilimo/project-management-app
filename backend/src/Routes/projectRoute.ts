import { Router , Request, Response} from 'express';
import { createProject } from '../controllers/projectControllers';


const projectRouter=Router();

projectRouter.post('/', createProject);




export default projectRouter;