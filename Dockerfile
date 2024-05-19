# 1.
# 이미지에 jvm18 버전이 존재해야 다른 환경에서 이미지를 받고, jar파일을 실행했을경우 정상적으로 프로젝트가 실행된다.
# 자동으로 사용하는 버전에 맞게 다운하라는 명령어임 아래는
FROM openjdk:18-slim
# 2. 경로에 있는 Jar파일의 이름을 OursApp.jar로 생성해서 이미지로 생성해라.
COPY build/libs/*.jar OursApp.jar
# 3.
ENTRYPOINT ["java", "-jar", "OursApp.jar"]


# final > docker build -t glennahn/ourschedule_project .  (소문자만 가능)
# 도커파일을 기반으로 위의 명령어를 치면 도커 허브에 이미지가 위의 명령어들을 기반으로 생성된다.