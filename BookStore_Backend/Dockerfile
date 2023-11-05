FROM maven:3.8.6-openjdk-18 AS build

WORKDIR /app

COPY ./pom.xml /app/pom.xml

COPY ./src/main/java/com/iliamalafeev/mybookstore/mybookstore_backend/BookStoreBackendApplication.java /app/src/main/java/com/iliamalafeev/mybookstore/mybookstore_backend/BookStoreBackendApplication.java

RUN mvn -f /app/pom.xml clean package

COPY . /app

RUN mvn -f /app/pom.xml clean package


FROM openjdk:17-jdk

EXPOSE 8080

COPY --from=build /app/target/BookStore_Backend-0.0.1-SNAPSHOT.jar /app/BookStore_Backend.jar

ENTRYPOINT ["sh", "-c", "java -jar app/BookStore_Backend.jar"]


#FROM openjdk:17-jdk
#
#WORKDIR /app
#
#COPY target/BookStore_Backend-0.0.1-SNAPSHOT.jar /app/BookStore_Backend.jar
#
#EXPOSE 8080
#
#CMD ["java", "-jar", "BookStore_Backend.jar"]