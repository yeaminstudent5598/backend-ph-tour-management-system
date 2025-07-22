/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAysnc"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"
import AppError from "../../errorHelpers/AppError"
import { setAuthCookie } from "../../utils/setCookie"
import { createUserTokens } from "../../utils/userToken"
import { envVars } from "../../config/env"
import { JwtPayload } from "jsonwebtoken"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync ( async (req: Request, res: Response, next: NextFunction) =>{
    const loginInfo = await AuthServices.credentialsLogin(req.body)

    //     res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure:false,   
    // })
    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // })

    setAuthCookie(res, loginInfo)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In successfully",
            data: loginInfo,
        })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = catchAsync ( async (req: Request, res: Response, next: NextFunction) =>{
    const refreshToken = await req.cookies.refreshToken
    if(!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

    //     res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure:false,   
    // })
    setAuthCookie(res, tokenInfo);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "New Access Token Retrived Successfully",
            data: tokenInfo,
        })
})
const logout = catchAsync ( async (req: Request, res: Response, next: NextFunction) =>{

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged Out successfully",
            data: null,
        })
})
const resetPassword = catchAsync ( async (req: Request, res: Response, next: NextFunction) =>{

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;

     await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Password Changed successfully",
            data: null,
        })
})
const googleCallbackController = catchAsync ( async (req: Request, res: Response, next: NextFunction) =>{

    let redirectTo = req.query.state ? req.query.state as string : ""
    
    if(redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }
    const user = req.user;

    console.log("user", user)

    if(!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    const tokenInfo = createUserTokens(user)

    setAuthCookie(res, tokenInfo)


        res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})


export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
}