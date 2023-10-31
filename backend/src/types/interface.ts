import { Request } from "express";

export interface User{
    user_id: string,
    fullName: string,
    email: string,
    password: string,
    cpassword: string,
    role: string
}

export interface loginUser extends Request{
    email:string,
    password: string
}