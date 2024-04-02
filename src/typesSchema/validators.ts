import zod from "zod";

export const createTodoSchema = zod.object({
    title: zod.string().min(1),
    description: zod.string(),
});

export const updateTodoSchema = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    done: zod.boolean().optional()
});

export const RegisterUserSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

export const LoginUserSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

export const updateUserSchema = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})
