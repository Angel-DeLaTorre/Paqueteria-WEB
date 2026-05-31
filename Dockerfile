# --- Etapa 1: Compilación de la aplicación ---
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación para producción aplicando las variables de entorno de Vite
RUN npm run build

# --- Etapa 2: Servidor de producción con Nginx ---
FROM nginx:1.25-alpine AS production

# Copiar nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos generados por Vite en la etapa anterior al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto estándar HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]