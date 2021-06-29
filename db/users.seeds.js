const userData = require('./user_data.json')
const Users = require('../models/users_models.js')

Users.deleteMany({})
    .then(() => {
        return Users.insertMany(userData)
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit()
    })