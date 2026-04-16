import { DataSource } from "typeorm";
import { Crypto } from "../entities/crypto"; // Importa tus entidades aquí
import dotenv from "dotenv";
import { User } from "../entities/User";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "postgres",
    synchronize: true,      
    logging: true,         
    entities: [Crypto, User],   
    subscribers: [],
    migrations: [],
});

export default AppDataSource;