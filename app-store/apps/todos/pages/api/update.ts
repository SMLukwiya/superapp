import { TodoResponse, todoUpdateSchema } from "@app-store/apps/todos/api-contracts/todo.schema";
import TodoEntity from "@app-store/apps/todos/business-logic/todo.entity";
import HttpError from "@app-store/shared/helpers/errors/HttpError";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return;

  const session = await getSession({ req });
  if (!session?.user?.id) return res.status(401).json("Not authenticated");

  const entity = new TodoEntity();

  try {
    const requestBody = todoUpdateSchema.parse(req.body);
    const response: TodoResponse = await entity.update(requestBody, session.user.id);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.code).json(error.message);
    throw error;
  }
}
