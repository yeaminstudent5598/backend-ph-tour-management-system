/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { User } from "./user.model";
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload, verify } from "jsonwebtoken";


// const user = await UserServices.createUser(req.body)
//         res.status(httpStatus.CREATED).json({
//             message: "User created successfully",
//             user
//         })




  
// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // throw new Error ("fake error")
//         // throw new //AppError(httpStatus.BAD_REQUEST, "fake error")
//         const user = await UserServices.createUser(req.body)
//         res.status(httpStatus.CREATED).json({
//             message: "User created successfully",
//             user
//         })
        
//     } catch (err: any) {
//         next(err)
        
//     }
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync ( async (req: Request, res: Response, next: NextFunction) =>{
    const user = await UserServices.createUser(req.body)
        // res.status(httpStatus.CREATED).json({
        //     message: "User created successfully",
        //     user
        // })
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User Created successfully",
            data: user,
        })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = catchAsync ( async (req: Request, res: Response, next: NextFunction) =>{

    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload
    
    const verifiedToken = req.user;
    const payload = req.body; 
    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload)
    
        // res.status(httpStatus.CREATED).json({
        //     message: "User created successfully",
        //     user
        // })
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User Updated successfully",
            data: user,
        })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    const result = await UserServices.getAllUsers();

    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })
    sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "All Users Retrieved Successfully",
            data: result.data,
            meta: result.meta,
        })
})

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}