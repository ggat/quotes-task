import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
const port = Number(process.env.API_PORT) || 8000;

console.log({ DATABASE_URL: process.env.DATABASE_URL });
console.log({ port });

app.get("/", async (req, res) => {
    const quotes = await prisma.quote.findMany();

    res.send(quotes);
});

app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
