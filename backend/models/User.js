const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 3
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
              return /\S+@\S+\.\S+/.test(v);
            },
            message: email => `${email.value} is not a valid email!`
          },
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 7
        
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)