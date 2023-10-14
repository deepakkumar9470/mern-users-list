const  mongoose = require ('mongoose');
const bcrypt = require("bcrypt")
const UserSchema = new mongoose.Schema({

    name: {
        type: String,

    },

    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
    },
    gender: {
        type: String
    },
    hearAbout:  [String],
    city: {
        type: String,
    },

    state: {
        type: String,
    },
},{timestamps: true})

UserSchema.methods.matchPassword =  async function(userPassword){
    return await bcrypt.compare(userPassword,this.password)
}

module.exports = mongoose.model('User', UserSchema)

