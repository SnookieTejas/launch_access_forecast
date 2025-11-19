# ------------ STAGE 1: Build the Vite app ------------
FROM node:20-alpine AS build

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# ------------ STAGE 2: Run with Nginx ------------
FROM nginx:stable-alpine

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: custom nginx.conf (if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
