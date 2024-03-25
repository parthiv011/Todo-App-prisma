import { PrismaClient } from "@prisma/client";
const prisma = new  PrismaClient();

interface todo {
    title: string,
    description?:string,
    markAsCompleted: boolean
}