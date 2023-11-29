const jf = require("jsonfile")
const path = "./Data/actions.json"

async function getUser(userId){
    const {actions} = await jf.readFile(path)
    const user = actions.filter(item => item.id === userId)[0]
    const users = actions.filter(item => item.id !== userId)
    return [user, users]
}

async function newLogin(userId){
    const [user, users] = await getUser(+userId)
    const date = new Date()
    const today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    if(user.date !== today){
        user.date = today
        user.maxActions = user.actionsAllowed
        jf.writeFile(path, {actions: [...users, user]})
    }
}

async function checkAction(req, res, next){
    const [user, users] = await getUser(+req.user.id)
    if(user.actionsAllowed == 0){
        return res.status(401).send({"message": "You max out all of your actions. Try again tomorrow"})
    }

    if(!req.params.noAction){
        user.actionsAllowed = user.actionsAllowed - 1
        jf.writeFile(path, {actions: [...users, user]})
    }
    next()
}
    

module.exports = {checkAction, newLogin}