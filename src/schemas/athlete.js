const { default: z } = require("zod");

const athleteSchema = z.object({
    CI: z.string().trim()
    .nonempty("La CI es requerida")
    .pipe(
        z.coerce.number("La CI debe ser un numero")
        .min(1000000, "Por favor ingresa un CI valido")
        .max(99999999, "Por favor ingresa un CI valido")
    ),
    fullName: z.string().trim().min(3, "El nombre completo debe tener al menos 3 caracteres"),
    addres: z.string().trim().min(5, "La dirección debe tener al menos 5 caracteres"),
    phoneNumber: z.string().trim()
    .nonempty("El número de teléfono es requerido")
    .pipe(
        z.coerce.number("El número de teléfono debe ser un número")
        .min(1000000000, "Por favor ingresa un número de teléfono valido")
        .max(9999999999, "Por favor ingresa un número de teléfono valido")
    ).transform((val) => val.toString()),
    emergencyPhoneNumber: z.string().trim()
    .nonempty("El número de teléfono para emergencia es requerido")
    .pipe(
        z.coerce.number("Este campo debe ser un número")
        .min(1000000000, "Por favor ingresa un número de teléfono valido")
        .max(9999999999, "Por favor ingresa un número de teléfono valido")
    ).transform((val) => val.toString()),
    email: z.string().nonempty("El correo es requerido").email("El email debe tener un formato correcto"),
    isPaid: z.boolean("El estado de pago es requerido"),
    membershipType: z.enum(['por_dia', 'semanal', 'mensual'], "El tipo de membresía es requerido")
})

export function validateAthlete(data){
    return athleteSchema.safeParse(data)
}