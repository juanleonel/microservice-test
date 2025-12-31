# Transaction Service and Crud service

Microservicio en **NestJS** y nodejs usando express, que produce eventos de transacciones hacia Kafka.

## Instalación

```bash
git clone https://github.com/juanleonel/microservice-test.git
docker-compose up -d

cd transaction-service
npm install
docker-compose up -d
npm run start:dev

cd CRUD
npm install
npm run start

```
Kafka UI
http://localhost:9100

pgAdmin4
http://localhost:5050/browser/

transaction-service doc
http://localhost:3000/api#/Transaction/
