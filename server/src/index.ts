import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
const port = Number(process.env.API_PORT) || 8000;

console.log({ DATABASE_URL: process.env.DATABASE_URL });
console.log({ port });

app.use(bodyParser.json());

app.get("/quotes", async (req, res) => {
    const quotes = await prisma.quote.findMany({
        include: { author: true },
        orderBy: { createdAt: "desc" },
    });

    res.send(quotes);
});

app.post("/quotes", async (req, res) => {
    const { content, author: authorName } = req.body;

    if (!content || !authorName) {
        res.status(400).send({ message: "Missing argument." });
        return;
    }

    const author = await prisma.author.findFirst({
        where: { name: req.body.author },
    });

    if (author) {
        await prisma.quote.create({
            data: {
                content: req.body.content,
                author: {
                    connect: { id: author.id },
                },
            },
        });
    } else {
        await prisma.quote.create({
            data: {
                content: req.body.content,
                author: {
                    create: { name: req.body.author },
                },
            },
        });
    }

    res.send({ status: "ok" });
});

app.put("/quotes/:id", async (req, res) => {
    const { content, author: authorName } = req.body;
    const { id } = req.params;

    if (!content || !authorName || !id) {
        res.status(400).send({ message: "Missing argument." });
        return;
    }

    const author = await prisma.author.findFirst({
        where: { name: req.body.author },
    });

    if (author) {
        await prisma.quote.update({
            where: {
                id: Number(id),
            },
            data: {
                content: req.body.content,
                author: {
                    connect: { id: author.id },
                },
            },
        });
    } else {
        await prisma.quote.update({
            where: {
                id: Number(id),
            },
            data: {
                content: req.body.content,
                author: {
                    create: { name: req.body.author },
                },
            },
        });
    }

    res.send({ status: "ok" });
});

app.delete("/quotes/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send({ message: "Missing argument." });
        return;
    }

    await prisma.quote.delete({
        where: {
            id: Number(id),
        },
    });

    res.send({ status: "ok" });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
