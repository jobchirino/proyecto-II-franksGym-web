const { default: z } = require("zod");

const resetPasswordSchema = z.object({
    password: z.string().trim().min(1, "La contraseña es requerida.")
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .refine((val) => /[A-Z]/.test(val), "La contraseña debe contener al menos una letra mayúscula.")
        .refine((val) => /[0-9]/.test(val), "La contraseña debe contener al menos un número.")
        .refine((val) => /[!@#$%^&*+]/.test(val), "La contraseña debe contener al menos un símbolo entre !@#$%^&*+."),

    confirmPassword: z.string().trim().nonempty("La confirmación de la contraseña es requerida."),
    token: z.string().nonempty("El token es requerido.").min(1, "El token es requerido.")
})

export function validateResetPassword(data){
    return resetPasswordSchema.safeParse(data)
}