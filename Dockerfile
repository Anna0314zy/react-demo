# --------- Stage 1: Build ---------
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@9
RUN pnpm install --frozen-lockfile

COPY . .

# 用 ARG 从 docker build 传入
ARG BUILD_ENV
RUN if [ "$BUILD_ENV" = "production" ]; then \
      pnpm build:prod; \
    else \
      pnpm build; \
    fi

# --------- Stage 2: Serve ---------
FROM nginx:alpine

# 构建时参数
ARG BUILD_ENV
ENV BUILD_ENV=${BUILD_ENV}

# 删除默认 html
RUN rm -rf /usr/share/nginx/html/*

# 拷贝构建好的前端文件
COPY --from=builder /app/dist /usr/share/nginx/html

# 拷贝自定义 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

