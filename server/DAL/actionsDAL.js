const jf = require("jsonfile")

async function getActions(){
    const {actions} = await jf.readFile("./Data/actions.json")
    return actions
}

module.exports = {getActions}