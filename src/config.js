import { config } from "dotenv";
config();

export default{
    port: process.env.PORT || 5000,
    server: process.env.SERVER,
    database: process.env.DB,
    user: process.env.USUARIO,
    password: process.env.PASS,
};