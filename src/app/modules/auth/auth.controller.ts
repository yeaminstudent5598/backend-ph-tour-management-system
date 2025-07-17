import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAysnc"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync ( async (req: Request, res: Response, next: NextFunction) =>{

    // const user = await UserServices.createUser(req.body)
        // res.status(httpStatus.CREATED).json({
        //     message: "User created successfully",
        //     user
        // })

    const loginInfo = await AuthServices.credentialsLogin(req.body)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In successfully",
            data: loginInfo,
        })
})
export const AuthControllers = {
    credentialsLogin
}