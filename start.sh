#!/bin/bash
# start.sh - 启动 Docker Compose

ENV=${1:-production}  # 默认开发环境

# 读取 package.json 版本
VERSION=$(jq -r '.version' package.json)

if [ "$ENV" = "production" ]; then
  export BUILD_ENV=production
  export DOCKER_TAG="prod-$VERSION"
else
  export BUILD_ENV=development
  export DOCKER_TAG="dev-$VERSION"
fi

export DOCKER_USERNAME=zouyu12
export DOCKER_IMAGE=react-demo

echo "Starting $ENV environment with tag $DOCKER_TAG..."

docker-compose up -d
docker-compose ps
