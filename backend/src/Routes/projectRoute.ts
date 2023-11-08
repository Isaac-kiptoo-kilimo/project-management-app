import { Router , Request, Response} from 'express';
import { assignProject, createProject, deleteProject, getAllProjects, getSingleProject, markProjectComplete } from '../controllers/projectControllers';


const projectRouter=Router();

projectRouter.post('/', createProject);
projectRouter.get('/', getAllProjects);
projectRouter.delete('/:projectID', deleteProject);
projectRouter.post('/assign/user', assignProject);
projectRouter.get('/:project_id', getSingleProject);
projectRouter.post('/complete/:project_id', markProjectComplete);




export default projectRouter;