import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

app.get("/api/archetype_test/:gender", async (req, res) => {
    try {
        console.log(req.params.gender)
        let allQuestions = await db.query(`SELECT * FROM ${req.params.gender}_questions order by id ASC`)
        res.json(allQuestions.rows)
    } catch (err) {
        res.json(err.message)
    }
})

app.get("/api/health", (req, res) => {
    res.json("hi")
})

app.listen(port, () => {
    console.log(`The app is running on port ${port}`)
})