const mong = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const shiftSchema = new mong.Schema({
    shiftId: {
        type: Number
    },
    shiftDate: {
        type: String,
        required: [true, "You must enter shift's date"]},
    startHour: {
        type: Number,
        required: [true, "You must enter shift's start hour"]},
    endHour: {
        type: Number},
    empId: {
        type: Number,
        required: true
    }},
    { versionKey: false })

shiftSchema.plugin(AutoIncrementID, {
    field: 'shiftId',
    incrementBy: 1,
    startAt: 1,
    trackerCollection: 'counters',
    trackerModelName: 'shiftCounter',
    });

const Shift = mong.model('shift', shiftSchema);

module.exports = Shift;