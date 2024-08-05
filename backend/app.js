const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const path = require("path")
const router = require("./routers/index")
const connetDatabase = require("./helpers/databaseHelper")
dotenv.config({
    path: "./config/env/config.env"
})

const app = express();
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:4200"]
}))
app.use("/api", router)
connetDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`server started port on ${process.env.PORT}`)
})
