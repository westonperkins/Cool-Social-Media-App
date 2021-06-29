const mongoose = require('../db/connection')

const usersSchema = new mongoose.Schema(
    {
       username: {type: String, requred: true},
       email: {type: String, required: true},
       password: {type: String, required: true}

    },
    { timestamps: true },
)

const Users = mongoose.model('Users', usersSchema)
module.exports = Users