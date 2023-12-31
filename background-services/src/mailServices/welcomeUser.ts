import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { dbConfig } from '../config/db'
import { sendMail } from '../helpers/emailHelpers'
dotenv.config()

export const welcomeUser = async() =>{
    const pool = await mssql.connect(dbConfig)

    const users = await (await pool.request().query('SELECT * FROM Users WHERE welcomed = 0')).recordset

    console.log(users);
    

    for (let user of users){
        ejs.renderFile('templates/welcomeUser.ejs', {Name: user.name}, async(error, data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string,
                to: user.email,
                subject: "Welcome Onboard",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE Users SET welcomed = 1 WHERE welcomed = 0')

                console.log('Emails send to new users');
                
            } catch (error) {
                console.log(error);
                
            }
        })
    }
}