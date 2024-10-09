import {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserById,
  UserModel,
} from "../models/users";
import express from "express";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "no email or password found " });
      return;
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password" // this is to make sure that these two parameters are always includede the the response object which are other wise excluded
    );
    if (!user) {
      res.status(400).json({ message: "you have entered the wrong email" });
      return;
    }
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      res.status(403).json({ message: "wrong password" });
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
    res.status(400).json({ message: "some unknown error has occured" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, userName, phoneNumber, age ,role} = req.body;
    if (!email || !password || !userName) {
      res.status(400).json({
        message: "either no email, no password or no userName",
      });
      return;
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({
        message: "email already registered",
      });
      return;
    }

    const salt = random();
    const user = await createUser({
      userName,
      email,
      password,
      phoneNumber,
      role,
      age,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    //added the belwo line so that the users session token can be created at registration time as well
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    res.cookie("authentication-app", user.authentication.sessionToken, {
      domain: "LocalHost",
      path: "/",
    });
    res.status(200).json(user).end();
    return;
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "an unknown error has occured" });
    return;
  }
};

// export const getUserInfoByEmail = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       res.status(400).json({ message: "missing email" });
//       return;
//     }
//     const user = await getUserByEmail(email);
//     if (!user) {
//       res.status(404).json({ message: "user doesnt exist" });
//       return;
//     }
//     res.status(200).json(user).end();
//     return;
//   } catch (error) {
//     console.log(error.message);
//     res.sendStatus(400).json({ message: "unknown error" });
//   }
// };

// export const getAllUsers = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const users = await getUsers();
//     if (!users) {
//       res.status(404).json({ message: "no user was found" });
//       return;
//     }
//     res.status(200).json(users).end();
//   } catch (error) {
//     console.log(error.message);
//     res.sendStatus(400).json({ message: "unkown error has occuered" });
//   }
// };

// export const updateUserById = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { id } = req.body;
//     if (!id) {
//       res.status(404).json({ message: "no id found" });
//       return;
//     }

//   } catch (error) {
//     console.log(error.message);
//     res.sendStatus(400).json({ message: "unknow error has occured" });
//   }
// };

// export const getUserInfoById = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const _id = req.body.id;
//     console.log("hellloooo", _id);
//     if (!_id) {
//       res.status(404).json({ message: "no id was found" });
//       return;
//     }
//     console.log("before");
//     const user = await getUserById(_id);
//     console.log("after");
//     if (!user) {
//       res.status(404).json({ message: "no user found" });
//     }
//     res.status(200).json(user).end();
//     return;
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ message: "unknown error has occured" });
//     return;
//   }
// };

// export const updateUserInfoById = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { id } = req.body;
//     const updateData = req.body;

//     if (!id) {
//       res.status(400).json({ message: "No ID found" });
//       return;
//     }

//     const updatedUser = await updateUserById(id, updateData);
//     if (!updatedUser) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     res.status(200).json(updatedUser).end();
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ message: "An unknown error has occurred" });
//   }
// };
