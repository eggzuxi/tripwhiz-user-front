FROM node:20 AS build
WORKDIR /app

# package.json과 package-lock.json을 복사하고 의존성을 설치합니다.
COPY package*.json ./
RUN npm install

# /app/build 폴더를 미리 생성 (선택적)
RUN mkdir -p /app/dist

# 애플리케이션 소스 코드를 복사하고 빌드합니다.
COPY . .
RUN npm run build

# Step 2: Set up Nginx for serving the build files
# 빌드된 정적 파일을 Nginx 서버로 제공하기 위해 Nginx 이미지를 사용합니다.
FROM nginx:alpine

# 빌드 단계에서 생성된 정적 파일을 Nginx의 기본 루트 디렉토리로 복사합니다.
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx가 80번 포트에서 실행되도록 설정합니다.
EXPOSE 80

# Nginx 시작 명령어
CMD ["nginx", "-g", "daemon off;"]
