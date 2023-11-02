import { Request } from "express";

export interface User{
    fullName: string,
    email: string,
    password: string,
    role: string
}

export interface loginUser extends Request{
    email:string,
    password: string
}

export interface project{
    project_name:string, 
    description: string,
    endDate: string, 
}