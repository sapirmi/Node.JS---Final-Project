const express = require("express")
const empBLL = require("../BLL/empBLL")
const {checkToken} = require("../middlewears/authMiddlewear")
const {checkAction} = require("../middlewears/actionMiddlewear")

const empRouter = express.Router()

function handleError(err){
    let errorsMessage = {"fullName": "", "startYear": ""}
    if(err.message.includes("validation failed")){
      Object.values(err.errors).forEach(({properties}) =>
      errorsMessage[properties.path] = properties.message
      )}
    return errorsMessage
  }

empRouter.get("/", [checkToken, checkAction], async(req, res) => {
    const result = await empBLL.getAllEmps()
    res.send(result)
})

empRouter.get("/byEmp/:id", checkToken, async(req, res) => {
    const {id} = req.params
    const result = await empBLL.getByEmpId(id)
    res.send(result)
})

empRouter.get("/byDep/:id", checkToken, async(req, res) => {
    const {id} = req.params
    const result = await empBLL.getByDepId(id)
    res.send(result)
})

empRouter.post("/", [checkToken, checkAction], async(req, res) => {
    try{
        const obj = req.body
        const result = await empBLL.addEmp(obj)
        res.status(201).send(result)
    }catch(err){
        res.status(400).send(handleError(err))
    }})

empRouter.delete("/:id", [checkToken, checkAction], async(req, res) => {
    const {id} = req.params
    const result = await empBLL.deleteEmp(id)
    res.send(result)})

empRouter.put("/:id", [checkToken, checkAction], async(req, res) => {
    const {id} = req.params
    const obj = req.body
    const result = await empBLL.updateEmp(id, obj)
    res.send(result)})

module.exports = empRouter
