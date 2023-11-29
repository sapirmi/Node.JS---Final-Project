const express = require("express")
const actBLL = require("../BLL/actionsBLL")
const {checkToken} = require("../middlewears/authMiddlewear")

const actRouter = express.Router()

actRouter.get("/", checkToken, async (req, res) => {
    const data = await actBLL.getAll()
    res.send(data)
})

module.exports = actRouter
