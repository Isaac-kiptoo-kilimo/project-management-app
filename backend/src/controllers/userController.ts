
import { Request, Response } from "express"
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { dbConfig } from "../config/db"
import mssql from 'mssql';
import Connection from "../dpHelpers/dphelpers";
import jwt from 'jsonwebtoken'
import { ExtendedUser } from "../middlewares/verifyToken";

const dbhelper=new Connection



export const registerUser=async(req:Request, res:Response)=>{
    try{
        console.log(req.body);

        let { fullName,email,password}=req.body


        let user_id=v4()

        const hashedPwd=await bcrypt.hash(password, 5) 



        let result=dbhelper.execute('registerUser',{
            user_id,fullName,email,password:hashedPwd
        })

        
        
        return res.status(200).json({
            message: 'User registered successfully'
        })
        
      
    }catch(error){
        return res.json({
            error:error
        });
        
    }

}

// export const loginUser=async(req:Request,res:Response)=>{
//     try{
//         const { email,password }=req.body

//         const pool = await mssql.connect(dbConfig)

//         let user=await (await pool.request().input("email",email).execute('loginUser')).recordset

//         console.log(user);
        
//         if(user[0]?.email==email){
//             // const correctPass=await bcrypt.compare(password,user[0]?.password)
//             const correctPass=password
//             if(!correctPass){
//                 return res.status(401).json({
//                     message: "Password is incorrect"
//                 })
//             }

//             const loginCredentials=user.map(records=>{
//                 const {...rest}=records
//                 return rest
//             })

//             const token =jwt.sign(loginCredentials[0], process.env.SECRET as string, {
//                 expiresIn: '48hrs'
//             })

//             return res.status(200).json({
//                 message: 'logged in successfully', token
//             })
        
//         }else{
//             return res.json({
//                 message: 'Email not found'
//             })
//         }

//     }catch(error){
//         return res.json({
//             error:error
//         })
//     }
// }


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const pool = await mssql.connect(dbConfig);

        const request = pool.request();
        request.input('email', mssql.VarChar(200), email); 
        request.input('password', mssql.VarChar(200), password); 

        const user = await request.execute('loginUser');

        if (user.recordset.length > 0) {
           
            const correctPass = user.recordset[0].password;  

           
            const isPasswordValid = await bcrypt.compare(password, correctPass);
           

            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Password is incorrect"
                });
            }

            const loginCredentials = { ...user.recordset[0] };


            const token = jwt.sign(loginCredentials, process.env.SECRET as string, {
                expiresIn: '48hrs'
            });

            return res.status(200).json({
                message: 'Logged in successfully',
                token
            });
        } else {
            return res.json({
                message: 'Email not found'
            });
        }

    } catch (error) {
        return res.json({
            error: error
        });
    }
};


export const getAllUsers= async(req:Request,res:Response)=>{
    try{
        const pool= await mssql.connect(dbConfig);
        let users=(await pool.request().execute('fetchAllUsers')).recordset

        return res.status(200).json({
            users: users
        })

    }catch(error){
        return res.json({
            error: error
        })
    }
}

export const checkCredentials= async(req:ExtendedUser,res:Response)=>{
    if(req.info){
        return res.json({
            info: req.info
        })
    }
}
