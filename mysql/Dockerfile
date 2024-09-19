FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=userpassword

COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306