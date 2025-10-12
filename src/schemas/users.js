const { default: z } = require("zod");

const userSchema = z.object({
    email: z.string().nonempty("El correo es requerido").email("El email debe tener un formato correcto"),

    password: z.string().min(1, "La contraseña es requerida.")
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .refine((val) => /[A-Z]/.test(val), "La contraseña debe contener al menos una letra mayúscula.")
        .refine((val) => /[0-9]/.test(val), "La contraseña debe contener al menos un número.")
        .refine((val) => /[!@#$%^&*+]/.test(val), "La contraseña debe contener al menos un símbolo entre !@#$%^&*+."),

    confirmPassword: z.string().nonempty("La confirmación de la contraseña es requerida."),

    name: z.string().transform(val => typeof val === 'string' ? val.trim() : String(val).trim())
        .refine((val) => val.length > 3, { message: "El nombre es requerido y debe tener minimo 3 carácteres." })
        .refine((val) => !/[0-9]/.test(val), {
            message: "El nombre no puede contener números.",
        })
})



export function validateUser(data){
    return userSchema.safeParse(data)
}