import express, { Request, Response } from 'express'

// const express = require('express')
const app = express();
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World test4!')
})

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
});

export default app;