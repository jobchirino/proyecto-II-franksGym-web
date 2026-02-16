import { prisma } from "@/app/libs/prisma";

const ITEMS_PER_PAGE = 5

export async function fetchAthletesPerPage({ searchQuery, page } = { page: 1 }) {
    try {
        if (searchQuery) {
            const parseQuery = isNaN(Number(searchQuery)) ? null : Number(searchQuery);
            if (!parseQuery) {
                return {
                    error: "Cédula de Identidad inválida",
                    data: []
                }
            }

            const athlete = await prisma.athlete.findUnique({
                where: {
                    CI: Number(searchQuery)
                },
            })

            if (!athlete) {
                return {
                    error: "Atleta no encontrado",
                    data: []
                }
            }

            return {
                data: [athlete],
                error: null
            }
        }

        const offset = (page - 1) * ITEMS_PER_PAGE
        const athletes = await prisma.athlete.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                fullName: true,
                CI: true,
                isPaid: true
            }
        })

        return {
            data: athletes,
            error: null
        }

    } catch (error) {
        console.error("Error en fetchAthletesPerPage:", error)
        return {
            error: "Error al cargar los atletas. Por favor, intenta de nuevo.",
            data: []
        }
    }
}

export async function fetchAthletesPages({ searchQuery }) {
    try {
        const parseQuery = isNaN(Number(searchQuery)) ? null : Number(searchQuery);

        if (searchQuery && !parseQuery) {
            return {
                error: "Cédula de Identidad inválida",
                totalPages: 0
            }
        }

        const count = parseQuery
            ? await prisma.athlete.count({
                where: {
                    CI: Number(searchQuery)
                },
            })
            : await prisma.athlete.count()

        const totalPages = Math.ceil(count / ITEMS_PER_PAGE)

        return {
            totalPages: totalPages,
            error: null
        }

    } catch (error) {
        console.error("Error en fetchAthletesPages:", error)
        return {
            error: "Error al cargar el número de páginas",
            totalPages: 1
        }
    }
}
