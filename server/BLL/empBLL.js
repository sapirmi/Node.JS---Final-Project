const empModel = require("../models/empModel");

async function getAllEmps() {
  const result = await empModel.aggregate([
    {
      $lookup: {
        from: "shifts",
        localField: "empId",
        foreignField: "empId",
        as: "shiftsInfo",
      },
    },
  ]);
return result}

async function getByEmpId(id){
  const data = await getAllEmps()
  const result = data.find(emp => emp.empId === +id)
  return result
}

async function getByDepId(id){
  const data = await getAllEmps()
  const result = data.filter(emp => emp.depId === +id)
  return result
}

async function addEmp(obj){
  const emp = new empModel(obj)
  await emp.save()
  return {"Message": "Created!"}
}

async function deleteEmp(id){
    await empModel.findOneAndDelete({empId: id})
    return {"Message": "Deleted!"}
  }
  
async function updateEmp(id, obj){
    await empModel.findOneAndUpdate({empId: id}, obj, {new: true})
    return {"Message": "Updated!"}
}  

module.exports = { deleteEmp, updateEmp, getByEmpId, getByDepId, addEmp, getAllEmps};
