import zod from "zod";

export const createTodoSchema = zod.object({
    title: zod.string().min(1, "Title is required"),
    description: zod.string(),
    userId: zod.number({
      required_error: "userId is required",
      invalid_type_error: "userId must be a number"
    }).positive("userId must be a positive number"),
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
