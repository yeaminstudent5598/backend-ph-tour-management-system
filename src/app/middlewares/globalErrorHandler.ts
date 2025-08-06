import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../errorHelpers/AppError"
import { handlerDuplicateError } from "../helpers/handlerDuplicateError"
import { handleCastError } from "../helpers/handleCastError"
import { handlerZodError } from "../helpers/handlerZodError"
import { handleValidationError } from "../helpers/handleValidationError"
import { TErrorSources } from "../interfaces/erro.type"


// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if(envVars.NODE_ENV === "development") {
        console.log(err)
    }

    let errorSources: TErrorSources[] = []
    let statusCode = 500
    let message = `Something Went Wrong ${err.message} from global error`

    // Duplicate Error
    if(err.code === 11000) {
        const simplifiedError = handlerDuplicateError(err)
        statusCode= simplifiedError.statusCode
        message = simplifiedError.message
    }
    // Object ID ERROR
    else if (err.name === "CastError"){
        const simplifiedError = handleCastError(err)
        statusCode= simplifiedError.statusCode
        message = simplifiedError.message
    }

    else if (err.name === "ZodError") {
        const simplifiedError = handlerZodError(err)
        statusCode = simplifiedError.statusCode
        message= simplifiedError.message
        errorSources = simplifiedError.errorSources as TErrorSources[]
    }

    //Mongoose ValidationError
    else if (err.name === "ValidationError"){
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources as TErrorSources[]
        message = simplifiedError.message
    }
    

    else if(err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err: null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}
