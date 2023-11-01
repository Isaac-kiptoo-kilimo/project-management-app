
import { Request, Response } from "express"
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { dbConfig } from "../config/db"
import mssql from 'mssql';
import Connection from "../dpHelpers/dphelpers";

const dbhelper=new Connection



export const registerUser=async(req:Request, res:Response)=>{
    try{

        let { fullName,email,password,cpassword}=req.body


        let user_id=v4()

        const hashedPwd=await bcrypt.hash(password, 5) 

        if(password==cpassword){
           console.log(password)
        }else{
            return res.status(401).json({
                message:"Password do not match"
            })
        }

        let result=dbhelper.execute('registerUser',{
            user_id,fullName,email,password:hashedPwd,cpassword:hashedPwd
        })

        return res.status(200).json({
            message: 'Employee registered successfully'
        })
        
      
    }catch(error){
        return res.json({
            error:error
        });
        
    }

}