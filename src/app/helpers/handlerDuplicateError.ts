import { TGenericErrorResponse } from "../interfaces/erro.type"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handlerDuplicateError = (err: any): TGenericErrorResponse =>{
 const matchedArray = err.message.match(/"([^"]*)"/)

 return {
     statusCode : 400,
     message : `${matchedArray[1]} already exists!!`
 }
}