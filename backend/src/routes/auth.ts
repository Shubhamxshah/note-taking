import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { prisma } from "../prisma";

const jwt_secret = process.env.jwt || "";

export const authRouter = Router();


authRouter.post("/signup", async (req, res) => {
  try {
    const {username, password} = req.body;
    if (!username || !password) {
      res.status(400).json({error: "username and password are required"})
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username, 
        password: hashedPassword, 
      }
    })
    const token = jwt.sign({userId: user?.id}, jwt_secret, {expiresIn: "1h"});
    
    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
    }); 

    res.status(201).json({ message: "User created successfully", user: {id: user.id, username: user.username}});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"})
  }
})

authRouter.get("/signin", async (req, res) => {
  try {
    const {username, password} = req.body;
    if (!username || !password) {
      res.status(401).json({error: "username and password are required"})
      return;
    }
    
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    if (!user?.username || !user?.password){
      res.status(401).json({error: "no such user in database"})
      return;
    }
    
    const checkpassword = await bcrypt.compare(password, user?.password); 
    const token = jwt.sign({userId: user?.id}, jwt_secret, {expiresIn: "1h"}) 
    if (checkpassword){
      res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict"
      })
      res.status(200).json({message: "user login successful.", user: {id: user.id, username: user.username}});
      return;
    } else {
      res.status(401).json({error: "incorrect password, please check and try again"})
      return;
    }
  } catch (error) {
    res.status(500).json({error: "internal server error"})
  }
})
