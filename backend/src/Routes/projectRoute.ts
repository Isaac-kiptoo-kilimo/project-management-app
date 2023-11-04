import { Router , Request, Response} from 'express';
import { createProject, deleteProject, getAllProjects } from '../controllers/projectControllers';


const projectRouter=Router();

projectRouter.post('/', createProject);
projectRouter.get('/', getAllProjects);
projectRouter.delete('/:projectID', deleteProject);




export default projectRouter;