/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interfaces/erro.type"

export  const handlerZodError = (err: any): TGenericErrorResponse =>{
    const errorSources: TErrorSources[] = []

    err.issues.forEach((issue: any) => {
            errorSources.push({
                path: issue.path[issue.path.length -1],
                message: issue.message
            }) 
        })

        return{
            statusCode: 400,
            message: "zod error",
            errorSources
        }
}