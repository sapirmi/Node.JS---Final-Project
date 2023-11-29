const jf = require("jsonfile")

async function getAll(){
    const data = await jf.readFile("./Data/actions.json")
    return data
}

module.exports = {getAll}