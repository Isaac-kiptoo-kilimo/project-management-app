 import { Request,Response } from "express"
 import mssql, { pool } from 'mssql'
import { dbConfig } from "../config/db"
import { v4 } from "uuid"
import Connection from  "../dpHelpers/dphelpers"

const sql = require('mssql');

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
        let projects=(await pool.request().execute('fetchAllProjects')).recordset

        return res.status(200).json(projects)

    }catch(error){
        return res.json({
            error: error
        })
    }
}


export const  getSingleProject=async (req:Request,res:Response)=>{
    try{

          const {project_id}=req.params;

          console.log(project_id);
          const data = {
                project_id: project_id,
              };
              const project = await dbhelper.execute('getSingleProject', data);
         return res.json(project.recordset)
          
        

    }catch(err){
          console.log(err)

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
    console.log(req.body);
    

    try {
        const { project_id, user_id } = req.body;

        // Call the stored procedure AssignProject in the database
        const result = await pool.request()
            .input('project_id', sql.NVarChar(100), project_id)
            .input('user_id', sql.NVarChar(100), user_id)
            .execute('AssignProject');

        if (result.returnValue === 0) {
            // Project assigned successfully
            res.status(200).json({ message: 'Project assigned successfully' });
        } else {
            // Project assignment failed (e.g., project is already assigned)
            res.status(400).json({ message: 'Project assignment failed' });
        }
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: "Did not loggin" });
    }
    // try {
    //     let { user_id, project_id } = req.params;
    //     const data = {
    //         user_id: user_id,
    //         project_id: project_id,
    //     };
      
    //    console.log(data);
       
      

    //     let result=await dbhelper.execute('assignProject', data);

    //     return res.status(201).json({
    //         message: 'Project assigned successfully',
    //     });
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //         message: 'Error in assigning the project',
    //     });
    // }
};





export const markProjectComplete = async (req: Request, res: Response) => {
    try {
        let { project_id } = req.params;
        const data = {
            project_id: project_id,
        };
        console.log(data);
        
        const result = await dbhelper.execute('markProjectComplete', data);
        console.log(result);
        
        if (result.rowsAffected[0] === 0) {
            return res.status(422).json({
                message: 'Project is not in progress or does not exist',
            });
        }

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
