# Frank's Gym - Sistema de Gestión de Membresías

## Descripción del Proyecto
Sistema web desarrollado para gestionar las membresías de los atletas del gimnasio "Frank's Gym". Esta aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los registros de membresías de manera eficiente y segura.

## Características Principales
- Registro y gestión completa de membresías
- Sistema de autenticación seguro
- Interfaz moderna y responsive
- Desarrollado con tecnologías de última generación
- Base de datos PostgreSQL en la nube

## Tecnologías Utilizadas
- Next.js 
- Prisma
- PostgreSQL
- NextAuth

## Configuración del Proyecto

### 1. Clonear el repositorio

```bash
git clone https://github.com/jobchirino/proyecto-II-franksGym-web.git
cd proyecto-II-franksGym-web
```

### 2. Instalar Dependencias
```bash
npm install
# o 
yarn install
# o 
bun install

```

### 3. Configurar Variables de Entorno
Crea un archivo **.env.local** en la raíz del proyecto y coloca las siguientes variables y reemplazalas con tus propios secretos y credenciales:

```env
DATABASE_URL="tu_url_de_conexion_a_la_base_de_datos"
NEXTAUTH_URL="http:localhost:3000"
NEXTAUTH_SECRET="tu_clave_secreta_de_nextauth"
```

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
# o
yarn dev
# o
bun dev
```

Ahora abre [http://localhost:3000](http://localhost:3000) en tu navegador.
