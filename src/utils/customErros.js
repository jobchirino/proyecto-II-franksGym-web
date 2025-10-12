import { object } from "zod"

export const createCustomError = (error) => {
    const customErrorObject = {}
    error.forEach(issue => {
        if(!customErrorObject[issue.path[0]]){
            customErrorObject[issue.path[0]] = issue.message
        }else{
            customErrorObject[issue.path[0]] += `, ${issue.message}`
        } 
    })
    const customError = []
    Object.entries(customErrorObject).forEach(([key, value]) => {
        customError.push({[key]: value.split(', ')})
    })
    console.log('aquí los values', Object.values(customError))
    return customError
}