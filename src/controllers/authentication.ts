import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.sendStatus(400);
      return;
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password" // this is to make sure that these two parameters are always includede the the response object which are other wise excluded
    );
    if (!user) {
      res.sendStatus(400);
      return;
    }
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      res.sendStatus(403);
      return;
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie("authentication-app", user.authentication.sessionToken, {
      domain: "LocalHost",
      path: "/",
    });
    res.status(200).json(user).end();
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, userName, phoneNumber, age } = req.body;
    if (!email || !password || !userName) {
      res.sendStatus(400);
      return;
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.sendStatus(400);
      return;
    }

    const salt = random();
    const user = await createUser({
      userName,
      email,
      password,
      phoneNumber,
      age,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    res.status(200).json(user).end();
    return;
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
    return;
  }
};
