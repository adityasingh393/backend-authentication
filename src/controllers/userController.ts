import { create } from "lodash";
import {
  getUserByEmail,
  getUserById,
  getUserBySessionToken,
  getUsers,
  updateUserById,
  UserModel,
} from "../models/users";
import express from "express";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    if (!users) {
      res.status(404).json({ message: "no user was found" });
      return;
    }
    res.status(200).json(users).end();
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400).json({ message: "unkown error has occuered" });
  }
};

export const getUserInfoById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const _id = req.body.id;
    console.log("hellloooo", _id);
    if (!_id) {
      res.status(404).json({ message: "no id was found" });
      return;
    }
    console.log("before");
    const user = await getUserById(_id);
    console.log("after");
    if (!user) {
      res.status(404).json({ message: "no user found" });
    }
    res.status(200).json(user).end();
    return;
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "unknown error has occured" });
    return;
  }
};

export const updateUserInfoById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body._id;
    const updateData = req.body;

    if (!id) {
      res.status(400).json({ message: "No ID found" });
      return;
    }

    const updatedUser = await updateUserById(id, updateData);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updatedUser).end();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "An unknown error has occurred" });
  }
};

export const getUserInfoByEmail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "missing email" });
      return;
    }
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "user doesnt exist" });
      return;
    }
    res.status(200).json(user).end();
    return;
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400).json({ message: "unknown error" });
  }
};
export const getUserInfoBySessionId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies["authentication-app"];
    if (!sessionToken) {
      res.status(403).send("No session Token found");
      return;
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      res.status(404).send("no user found");
      return;
    }
    res.status(200).json(existingUser).end();
  } catch (error) {
    console.log(error);
    res.status(400).send("unknown error has occured");
  }
};

export const getAllUsersInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentDate = new Date();
    const users = await getUsers();

    const usersCreatedToday = users.filter((user) => {
      const createdAt = new Date(user.createdAt);
      const timeDifference = currentDate.getTime() - createdAt.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      return daysDifference < 1;
    });

    const userCreatedFiveDaysAgo = users.filter((user) => {
      const createdAt = new Date(user.createdAt);
      const timeDifference = currentDate.getTime() - createdAt.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      return daysDifference < 3;
    });

    const userCreatedTenDaysAgo = users.filter((user) => {
      const createdAt = new Date(user.createdAt);
      const timeDifference = currentDate.getTime() - createdAt.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      return daysDifference < 10;
    });
    res
      .status(200)
      .json({
        today: usersCreatedToday,
        fiveDays: userCreatedFiveDaysAgo,
        tenDays: userCreatedTenDaysAgo,
        totalUser: users,
      })
      // .end();
  } catch (error) {
    console.log(error);
    res.status(400).send("unkown error has occured");
  }
};
