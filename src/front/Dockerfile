FROM node:lts-alpine

#curl 설치 (clinet-url) : 필수는 아님(postman 같은 것)
RUN apk add --no-cache curl

WORKDIR /
COPY . ./
RUN npm install

# 접속가능한 주소 설정 "--", "--host", "0.0.0.0" 를해야지 외부에서 현 프로젝트에 접근가능
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# OursAppFront.jar
# 이미지 생성 : docker build -t glennahn/ourschedule_project .