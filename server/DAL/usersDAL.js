const axios = require("axios")

async function getUser(url){
    const {data} = await axios.get(url)
    return data
}

module.exports = {getUser}