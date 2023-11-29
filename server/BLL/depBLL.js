const depModel = require("../models/depModel");
const empModel = require("../models/empModel");

async function getDeps() {
  const result = await depModel.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "depId",
        foreignField: "depId",
        as: "empInfo",
      },
    },
  ]);

  const final = result.map((dep) => {
    return {
      depInfo: {depName: dep.depName, depId: dep.depId},
      managerInfo: {managerName: dep.managerName, managerId: dep.empInfo.find(emp => emp.fullName === dep.managerName)?.empId},
      employees: dep.empInfo.map((emp) => {
        return { empName: emp.fullName, empId: emp.empId };
      }),
    };
  });
  return final}


async function updateDep(id, obj){
    await depModel.findOneAndUpdate({depId: id}, obj, {new: true})
    return {"Message": "Updated!"}
}

async function deleteDep(id){
  const dep = await depModel.findOneAndDelete({depId: id})
  return {"Message": "Deleted!"}
}

async function addDep(obj){
  const dep = new depModel(obj)
  await dep.save()
  await empModel.findOneAndUpdate({fullName: obj.managerName}, {depId: dep.depId})
  return {"Message": "Created!"}
}


module.exports = { getDeps , updateDep, deleteDep, addDep};
