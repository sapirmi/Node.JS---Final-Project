const shiftModel = require("../models/shiftModel");

async function getShfts() {
  const data = await shiftModel.find()
  return data}

async function updateShft(id, obj) {
  const data = await shiftModel.findOneAndUpdate({shiftId: id}, obj)
  return {"Message": "Shift Ended!"}
}

async function addShft(obj) {
  const shft = new shiftModel(obj)
  await shft.save()
  return {"Message": "Shift Created!"}
  }

module.exports = { getShfts, addShft, updateShft };
