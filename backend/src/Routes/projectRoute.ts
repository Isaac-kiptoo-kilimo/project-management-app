import { Router , Request, Response} from 'express';
import { assignProject, createProject, deleteProject, getAllProjects, markProjectComplete } from '../controllers/projectControllers';


const projectRouter=Router();

projectRouter.post('/', createProject);
projectRouter.get('/', getAllProjects);
projectRouter.delete('/:projectID', deleteProject);
projectRouter.post('/assign/:user_id/:project_id', assignProject);
projectRouter.post('/complete/:project_id', markProjectComplete);




export default projectRouter;