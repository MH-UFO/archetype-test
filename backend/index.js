import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { Pool } from "pg"

const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "archetypes",
    password: "13873387",
    port: 5000
})

app.get("/api/archetype_test/:gender", async (req, res) => {
    try {
        console.log(req.params.gender)
        let allQuestions = await db.query(`SELECT * FROM ${req.params.gender}_questions`)
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