const express = require("express")
const jwt = require("jsonwebtoken")
const users = require("../DAL/usersDAL")
const env = require("../config/env.json")
const {newLogin} = require("../middlewears/actionMiddlewear")

const authRouter = express.Router()

authRouter.post("/", async (req, res) =>{
    const {username, email} = req.body
    const data = await users.getUser(`https://jsonplaceholder.typicode.com/users?username=${username}`)
    if(data[0]){
        if(data[0].email === email){
            const userId = data[0].id
            const accessToken = jwt.sign({id: userId}, env.jwk)
            res.send({accessToken})
        }else{
            res.status(401).send({"message": "Email incorrect"})
        }
    }else{
        res.status(404).send({"message": "User Doesnt Exists"})
    }
})

module.exports = authRouter
