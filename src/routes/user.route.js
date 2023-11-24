// user.route.js

import express from "express";

import asyncHandler from 'express-async-handler';

import { userSignin } from "file:///C:/UMC-Node.js/test3/src/controllers/user.controllers.js";
import { userLogin } from "file:///C:/UMC-Node.js/test3/src/controllers/user.controllers.js";

export const userRouter = express.Router();

userRouter.post('/signin', asyncHandler(userSignin));
userRouter.post('/login', asyncHandler(userLogin));