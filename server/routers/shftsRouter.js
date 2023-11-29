const express = require("express")
const shftsBLL = require("../BLL/shftsBLL")
const {checkToken} = require("../middlewears/authMiddlewear")
const {checkAction} = require("../middlewears/actionMiddlewear")


const shiftRouter = express.Router()

function handleError(err){
    let errorsMessage = {"shiftDate": "", "startHour": ""}
    if(err.message.includes("validation failed")){
      Object.values(err.errors).forEach(({properties}) =>
      errorsMessage[properties.path] = properties.message
      )}
    return errorsMessage
  }

shiftRouter.get("/", [checkToken, checkAction], async(req, res) => {
    const result = await shftsBLL.getShfts()
    res.send(result)
})

shiftRouter.put("/:id", [checkToken, checkAction], async(req, res) => {
    const {id} = req.params
    const obj = req.body
    const result = await shftsBLL.updateShft(id, obj)
    res.send(result)
})

shiftRouter.post("/", [checkToken, checkAction], async(req, res) => {
    try{
        const obj = req.body
        const result = await shftsBLL.addShft(obj)
        res.status(201).send(result)
    }catch(err){
        res.status(400).send(handleError(err))
    }
})


module.exports = shiftRouter
