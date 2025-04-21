import express, { Request, Response } from 'express'

// const express = require('express')
const app = express();
const port = 3000

//parser
app.use(express.json());
app.use(express.text());

const logger = (req: Request, res: Response, next: Function) => {
  console.log(req.url, req.method, req.hostname); 
  //req.url = /
  //req.method = GET, POST, PUT, DELETE, PATCH
  //req.hostname = localhost:5000
  next();
};

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  // res.send("Hello World test4 post!");
  res.json({
    message: "Successfully Received Data!",
  })
});

export default app;