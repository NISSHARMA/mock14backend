
const express = require("express")
const cors = require("cors")

const app = express()
const { userRoute } = require("./Routes/userRoute")
const { connection } = require("./db")
const { blogRouter } = require("./Routes/blogRouter")

app.use(cors())
app.use(express.json())

app.use("/user", userRoute)
app.use("/blog", blogRouter)

app.listen(8000, async () => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("App is runinng on port 8000")
})