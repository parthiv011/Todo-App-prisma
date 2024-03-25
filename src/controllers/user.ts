import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface user {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface updateParams {
  firstName: string;
  lastName: string;
}

export async function insertUser(user: user) {
  const response = await prisma.user.create({
    data: user,
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
    },
  });

  return response;
}

export async function updateUser(
  username: string,
  { firstName, lastName }: updateParams
) {
  const response = await prisma.user.update({
    where: { username },
    data: {
      firstName,
      lastName,
    },
  });

  return response;
}

export async function deleteUser(username: string) {
  const user = await prisma.user.delete({
    where: { username },
  });

  return user;
}
