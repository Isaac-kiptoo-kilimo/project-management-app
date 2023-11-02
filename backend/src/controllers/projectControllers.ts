 import { Request,Response } from "express"
 import mssql from 'mssql'
import { dbConfig } from "../config/db"

export const createProject=async(req:Request,res:Response)=>{
    try{

        const { project_name, description, endDate } = req.body
        const pool=await mssql.connect(dbConfig)

    }catch(error){
        return res.json({
            error : error
        })
    }
}