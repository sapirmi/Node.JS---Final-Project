const express = require("express")
const cors = require("cors")
const connectDB = require("./config/dbConnection")
const depRouter = require("./routers/depRouter")
const empRouter = require("./routers/empRouter")
const shftRouter = require("./routers/shftsRouter")
const actRouter = require("./routers/actionsRouter")
const authRouter = require("./routers/authRouter")

const app = express()
const port = 3000

connectDB()

app.use(cors())
app.use(express.json())


app.use("/departments", depRouter)
app.use("/employees", empRouter)
app.use("/shifts", shftRouter)
app.use("/actions", actRouter)
app.use("/login", authRouter)

app.listen(port, () => {console.log(`app is listening at http://localhost:${port}`)})