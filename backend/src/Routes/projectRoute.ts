import { Router , Request, Response} from 'express';
import { assignProject, createProject, deleteProject, getAllProjects } from '../controllers/projectControllers';


const projectRouter=Router();

projectRouter.post('/', createProject);
projectRouter.get('/', getAllProjects);
projectRouter.delete('/:projectID', deleteProject);
projectRouter.post('assign/', assignProject);



export default projectRouter;