import { prisma } from "@/app/libs/prisma";

const ITEMS_PER_PAGE = 5

export async function fetchAthletesPerPage({ searchQuery, page }) {
    try {
        if (searchQuery) {
            const parseQuery = isNaN(Number(searchQuery)) ? null : Number(searchQuery);
            if (!parseQuery) {
                return { 
                    success: false, 
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
                    success: false, 
                    error: "Atleta no encontrado",
                    data: []
                }
            }
            
            return { 
                success: true, 
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
            success: true, 
            data: athletes,
            error: null 
        }
        
    } catch (error) {
        console.error("Error en fetchAthletesPerPage:", error)
        return { 
            success: false, 
            error: "Error al cargar los atletas. Por favor, intenta de nuevo.",
            data: null 
        }
    }
}

export async function fetchAthletesPages({ searchQuery }) {
    try {
        const parseQuery = isNaN(Number(searchQuery)) ? null : Number(searchQuery);
        
        if (searchQuery && !parseQuery) {
            return { 
                success: false, 
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
            success: true, 
            totalPages: totalPages,
            error: null 
        }
        
    } catch (error) {
        console.error("Error en fetchAthletesPages:", error)
        return { 
            success: false, 
            error: "Error al cargar el número de páginas",
            totalPages: 1 
        }
    }
}
