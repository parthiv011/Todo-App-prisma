import { PrismaClient } from "@prisma/client";
import { createTodoSchema, updateTodoSchema } from "../typesSchema/validators";
const prisma = new PrismaClient();

interface todo {
  title: string;
  description?: string;
  markAsCompleted: boolean;
}
export const addTodos = async (req: any, res: any) => {
  try {
    const { title, description } = createTodoSchema.parse(req.body);
    await prisma.todos.create({
      data: {
        title,
        description,
        userId: req.userId,
      },
    });
    return res.status(201).json({
      msg: "Todo Created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTodos = async (req: any, res: any) => {
  try {
    const todos = await prisma.todos.findMany({
      where: {
        userId: req.userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
      },
    });

    res.json({
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchTodos = async (req: any, res: any) => {
  try {
    const filter = req.query.filter || "";

    const todos = await prisma.todos.findMany({
      where: {
        // Ensure todos belong to the logged-in user
        userId: req.userId,
        OR: [
          // Filter todos by title and description
          { title: { contains: filter, mode: "insensitive" } },
          { description: { contains: filter, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
      },
    });

    return res.json({
      todos,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateTodo = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { title, description, done } = updateTodoSchema.parse(req.body);

    const changedTodo = await prisma.todos.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        done
      },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
      }
    });

    return res.json({
        msg: "Updated successfully!",
        changedTodo,
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTodo = async (req:any, res: any) => {
    try {
        const { id } = req.params;

        await prisma.todos.delete({
          where: { id: parseInt(id) },
        });

        res.json({ msg: 'Todo deleted successfully' });
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}