import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { LoginUserSchema, RegisterUserSchema } from "../typesSchema/validators";
import jwt from "jsonwebtoken";
import secret from "../config";
const prisma = new PrismaClient();

interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const signup = async (req: any, res: any) => {
  try {
    const { username, password, firstName, lastName }: User =
      RegisterUserSchema.parse(req.body);

    // Check if there are any validation errors
    try {
      RegisterUserSchema.parse(req.body);
    } catch (error) {
      return res.status(400).json({
        msg: "Incorrect Inputs / zod errors!",
      });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({
        msg: "User Already exists!",
      });
    }

    // Create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, firstName, lastName },
      select: {
        id: true,
        username: true,
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      secret
    );

    return res.status(201).json({
      msg: "User registered Succeesfully",
      token,
      newUser,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { username, password } = LoginUserSchema.parse(req.body);

    try {
      LoginUserSchema.parse(req.body);
    } catch (error) {
      return res.status(400).json({
        msg: "Incorrect Inputs / zod errors!",
      });
    }
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        msg: "Invalid Username or Password!",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      secret
    );

    return res.json({
      token: token,
      username: username,
      name: `${user.firstName} ${user.lastName}`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal server error!",
    });
  }
};
export const updateUser = async (req:any, res: any) => {
  
}