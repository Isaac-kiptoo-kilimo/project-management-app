 import { Request,Response } from "express"
 import mssql from 'mssql'
import { dbConfig } from "../config/db"
import { v4 } from "uuid"
import Connection from  "../dpHelpers/dphelpers"

const dphelper = new Connection

export const createProject=async(req:Request,res:Response)=>{
    try{

        const { project_name, description, endDate } = req.body
        let project_id=v4()
        
        const pool=await mssql.connect(dbConfig)
        let project_result=dphelper.execute('createProject', {project_id, project_name,description,endDate});

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