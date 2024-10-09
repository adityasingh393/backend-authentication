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
      res.status(403).send("Unauthorized: No session token");
      return;
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      res.status(403).send("Unauthorized: Invalid session token");
      return;
    }
    merge(req, { identity: existingUser });
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error in authentication");
  }
};
