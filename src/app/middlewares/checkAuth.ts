import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken"
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";

export const checkAuth = (...authRoles: string[]) => async(req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if(!accessToken) {
            throw new AppError(403, "No Token Recievied")
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
//authRoles = ["ADMIN", "SUPER_ADMIN"].includes("ADMIN")
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route")
        }

        console.log(verifiedToken)

        req.user = verifiedToken
        next()
        
    } catch (error) {
        next(error)
    }
}