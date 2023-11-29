const mong = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const empSchema = new mong.Schema({
    empId: {
        type: Number},
    fullName: {
        type: String,
        required: [true, "You must enter employees's full name"]},
    startYear: {
        type: Number,
        require: [true, "You must choose employees's start year"]},
    depId: {
        type: Number,
        require: true}},
    { versionKey: false })

empSchema.plugin(AutoIncrementID, {
    field: 'empId',
    incrementBy: 1,
    startAt: 1,
    trackerCollection: 'counters',
    trackerModelName: 'empCounter',
    });

const Emp = mong.model('employee', empSchema);
  
module.exports = Emp;