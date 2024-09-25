# 18.18.0
FROM node:20.12.2 AS build
RUN getent group nonroot || groupadd nonroot && useradd -g nonroot -m nonroot 
RUN chown nonroot:nonroot /var/cache/ && chmod 775 /var/cache/ 
USER nonroot  
WORKDIR /build
COPY --chown=nonroot:nonroot package*.json ./
RUN npm i --force
RUN npm ci


COPY --chown=nonroot:nonroot . .

RUN npm i esbuild@0.20.2
RUN npm run build

# NGINX
FROM nginx:latest
RUN getent group nonroot || groupadd nonroot && useradd -g nonroot -m nonroot  
RUN chown nonroot:nonroot /var/cache/nginx/ && chmod 777 /var/cache/nginx
RUN chown nonroot:nonroot /var/run/ && chmod 777 /var/run/
USER nonroot
WORKDIR /usr/share/nginx/html
COPY --from=build --chown=nonroot:nonroot /build/dist/ .
COPY --from=build --chown=nonroot:nonroot /build/nginx.conf /etc/nginx/conf.d/default.conf

