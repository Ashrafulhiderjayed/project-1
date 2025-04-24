import express, { NextFunction, Request, Response } from 'express'

// const express = require('express')
const app = express();
const port = 3000

//parser
app.use(express.json());
app.use(express.text());

const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

userRouter.post('/create-user', (req: Request, res: Response) =>{
  const user = req.body;
  console.log(user);  

  res.json({
    success: true,
    message: "User Created Successfully!",
    data: user,
  })
}) 

courseRouter.post('/create-course', (req: Request, res: Response) =>{
  const course = req.body;
  console.log(course);  

  res.json({
    success: true,
    message: "Course Created Successfully!",
    data: course,
  })
})

// error handling middleware
app.get("/", async (req: Request, res: Response) => {
  try{
    // throw new Error("Error Occurred!")
    res.send("Hello World test4!");
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    })
  }
})


const logger = (req: Request, res: Response, next: Function) => {
  console.log(req.url, req.method, req.hostname); 
  //req.url = /
  //req.method = GET, POST, PUT, DELETE, PATCH
  //req.hostname = localhost:5000
  next();
};

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send('something');
    } catch (error) {
      next(error);
      // res.status(400).json({
      //   success: false,
      //   message: "failed to get data",
      // });
    }
  }
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post("/", logger, (req: Request, res: Response) => {
  console.log(req.body);
  // res.send("Hello World test4 post!");
  res.json({
    message: "Successfully Received Data!",
  })
});

// if the route is not found, send a 404 error
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ 
    success: false,
    message: "Route Not Found!",
  })
})

//Global Error Handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.log(err);
  res.status(400).json({
    success: false,
    message: "Internal Server Error!",
  })
})

export default app;