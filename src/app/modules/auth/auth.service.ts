/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import { IsActive, IUser } from "../user/user.interface"
import httpStatus from "http-status-codes"
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userToken";

const credentialsLogin = async (payload: Partial<IUser>) => {
    const {email, password} = payload;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

    if(!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }


//         const jwtPayload = {
//         userId: isUserExist._id,
//         email: isUserExist.email,
//         role: isUserExist.role
//     }

//     const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    
//    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

     const userToken = createUserTokens(isUserExist)

//    delete isUserExist.password;

    const {password: pass, ...rest} = isUserExist.toObject()
    return{
       accessToken: userToken.accessToken,
       refreshToken: userToken.refreshToken,
       user: rest
    }

}
const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return{
        accessToken: newAccessToken
    }

}
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) =>{

    const user = await User.findById(decodedToken.userId)
    const isOldPasswordMatched = await bcryptjs.compare(oldPassword, user!.password as string)

    if(!isOldPasswordMatched){
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }
    
    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save();

}

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
}