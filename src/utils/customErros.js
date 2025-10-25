const fieldMap = {
    name: 'Nombre',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña'
}


export const createCustomError = (error) => {
    const translateZodErrors = () => {
      return error.map((issue) => {
        const translatedFieldName = fieldMap[issue.path[0]] 
        return {
          field: translatedFieldName,
          message: issue.message
        };
      });
    };
    const translatedErrors = translateZodErrors();
    console.log('errores traducidos', translatedErrors)
    const customErrorObject = {}
    translatedErrors.forEach(issue => {
        if(!customErrorObject[issue.field]){
            customErrorObject[issue.field] = issue.message
        }else{
            customErrorObject[issue.field] += `, ${issue.message}`
        } 
    })
    const customError = []
    Object.entries(customErrorObject).forEach(([key, value]) => {
        customError.push({[key]: value.split(', ')})
    })
    return customError
}