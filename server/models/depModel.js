const mong = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const depSchema = new mong.Schema({
    depName: {
        type: String,
        required: [true, "You must insert department's name"],
        unique: [true, "This department already exists, please enter different name"]},
    managerName: {
        type: String,
        required: [true, "You must choose manager's name"]},
    depId: {
        type: Number}},
    { versionKey: false })

depSchema.plugin(AutoIncrementID, {
    field: 'depId',
    incrementBy: 1,
    startAt: 1,
    trackerCollection: 'counters',
    trackerModelName: 'depCounter',
    });

const Dep = mong.model('department', depSchema);
module.exports = Dep;