const express = require("express")
const depBLL = require("../BLL/depBLL")
const {checkToken} = require("../middlewears/authMiddlewear")
const {checkAction} = require("../middlewears/actionMiddlewear")

const depRouter = express.Router()

function handleError(err){
    let errorsMessage = {"managerName": "", "depName": ""}
    if(err.message.includes("validation failed")){
      Object.values(err.errors).forEach(({properties}) =>
      errorsMessage[properties.path] = properties.message
      )}
    if(err.code === 11000){
        errorsMessage.depName = "This department already exists, please enter different name"
    }
    return errorsMessage
  }

depRouter.get("/", [checkToken, checkAction], async(req, res) => {
    const data = await depBLL.getDeps()
    res.send(data)
})

depRouter.put("/:id", checkToken, async(req, res) => {
    const {id} = req.params
    const obj = req.body
    const result = await depBLL.updateDep(id, obj)
    res.send(result)})

depRouter.delete("/:id", [checkToken, checkAction], async(req, res) => {
    const {id} = req.params
    const result = await depBLL.deleteDep(id)
    res.send(result)})

depRouter.post("/", [checkToken, checkAction], async(req, res) =>{
    try{
        const obj = req.body
        const result = await depBLL.addDep(obj)
        res.status(201).send(result) 
    }catch(err){
        res.status(400).send(handleError(err))
    }})

module.exports = depRouter