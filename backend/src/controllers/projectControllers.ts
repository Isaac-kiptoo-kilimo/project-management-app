 import { Request,Response } from "express"
 import mssql from 'mssql'
import { dbConfig } from "../config/db"
import { v4 } from "uuid"
import Connection from  "../dpHelpers/dphelpers"

const dbhelper = new Connection

export const createProject=async(req:Request,res:Response)=>{
    try{

        const { project_name, description, endDate } = req.body
        let project_id=v4()
        
        const pool=await mssql.connect(dbConfig)
        let project_result=dbhelper.execute('createProject', {project_id, project_name,description,endDate});

        return res.status(200).json({
            message: 'Project was created successfully'
        })

    }catch(error){
        return res.json({
            error : error
        })
    }
}

export const getAllProjects= async(req:Request,res:Response)=>{
    try{
        const pool= await mssql.connect(dbConfig);
        let users=(await pool.request().execute('fetchAllProjects')).recordset

        return res.status(200).json({
            users: users
        })

    }catch(error){
        return res.json({
            error: error
        })
    }
}


export const deleteProject=async(req:Request,res:Response)=>{
    try{
        let {projectID}=req.params

        let data={
            project_id:projectID,
        }
        console.log(data)

        if(!data){
            return res.status(422).json({
                message:"Already deleted"
            })
        }else{
            let result=await dbhelper.execute('deleteProject',data)
        
            return res.status(200).json({
                message:'Deleted successfully'
            })
        }
        

    }catch(error){
        console.log(error)
        return res.status(201).json({
            message: "Error in deleting the project"
        })
    }
}


export const assignProject = async (req: Request, res: Response) => {
    try {
        let { user_id, project_id } = req.params;
        const data = {
            user_id: user_id,
            project_id: project_id,
        };
      
       
        const project :any= await dbhelper.query('SELECT projectStatus FROM Projects WHERE project_id = @project_id');

        if (project.length === 0) {
            return res.status(404).json({
                message: 'Project not found',
            });
        }

        if (project[0].projectStatus === 'assigned') {
            return res.status(422).json({
                message: 'Project is already assigned',
            });
        }

        let result=await dbhelper.execute('assignProject', data);

        return res.status(201).json({
            message: 'Project assigned successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error in assigning the project',
        });
    }
};


export const markProjectComplete = async (req: Request, res: Response) => {
    try {
        let { projectID } = req.params;
        const data = {
            project_id: projectID,
        };

        const result = await dbhelper.execute('markProjectComplete', data);

        return res.status(200).json({
            message: 'Project marked as complete successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error in marking the project as complete',
        });
    }
};
