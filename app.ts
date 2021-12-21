import express, { Request, Response } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { databaseConnection } from './db/connection';
import { getConnection } from 'typeorm';
import { Webhooks } from './models/webhooks';


const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

const Webhook = new Webhooks()

// route webhooks
app.post('/webhooks', (req: Request, res: Response) => {
    Webhook.setData(req.body);
    res.status(201).json({ message: req.body})
})

app.get("/getList", (req: Request, res: Response) => {
    res.status(200).json(Webhook.data)
})

app.listen(3001, async () => {
   try {
       const db = await (await databaseConnection()).connect()
       console.log("isConnected", db.isConnected)
   }catch(error) {
    console.log("error databse", error)
       
   }
})