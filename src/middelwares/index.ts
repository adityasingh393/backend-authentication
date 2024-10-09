import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../models/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["authentication-app"];
    if (!sessionToken) {
      return res.status(403);
    }

    const exisitingUser = await getUserBySessionToken(sessionToken);
    if (!exisitingUser) {
      return res.status(403);
    }
    merge(req, { identity: exisitingUser });
  } catch (error) {
    console.log(error.message);
    return res.status(400);
  }
};
