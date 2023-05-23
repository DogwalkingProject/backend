import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import cookieParser from 'cookie-parser';
import { testDb } from './models';
dotenv.config();


const app: Express = express();
const port = process.env.PORT ? process.env.PORT : 8080

app.use(cors({
    origin: ["http://lvh.me:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
    next();
});
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
})
testDb(); 
app.use(routes);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});