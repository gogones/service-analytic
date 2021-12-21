import { ConnectionManager, createConnection } from "typeorm";

export const databaseConnection = async () => {
    const connectionManager = new ConnectionManager();
    const connection = connectionManager.create({
        username: "admin",
        type: 'postgres',
        password: "postgresql",
        database: "service-analytic", 
        host: "localhost",
        port: 5433
    });
  return connection;
}