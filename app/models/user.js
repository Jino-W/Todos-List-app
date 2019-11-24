const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: 'Username is mandatory',
        unique: true,
        minlength: 5,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        validate:{
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'Invalid email fomat'
            }
        }
    },
    mobile:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength:10,
        maxlength:10,
        validate:{
            validator: function(value){
                return validator.isNumeric(value)
            },
            message: function(){
                return 'invalid mobile format'
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 150,
    },
    tokens:[
        {
            token:{
                type: String
            },
            createdAt:{
                type: Date,
                value: Date.now
            }
        }
    ]
})

//instance inbuilt-methods
userSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
            .then(salt=>{
                bcryptjs.hash(user.password, salt)
                    .then(encryptedPassword=>{
                        user.password = encryptedPassword
                        next()
                    })
            })
    }else{
        next()
    }
})

//instance methods
userSchema.methods.generateToken = function(){
    const user = this
    
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }

    const token = jwt.sign(tokenData, "jwt@123")
    user.tokens.push({token})

    return user.save()
        .then(user=>{
            return Promise.resolve(token)
        })
        .catch(err=>{
            return Promise.reject(err)
        })
}

//static methods
userSchema.statics.findByCredentials = function(email, password){
    const User = this
    return User.findOne({email})
        .then(user=>{
            if(user){
                return bcryptjs.compare(password, user.password)
                    .then(result=>{
                        if(result){
                            return Promise.resolve(user)
                        }else{
                            return Promise.reject({errors: 'Invalid email/password'})
                        }
                    })
                    .catch(err=>{
                        return Promise.reject(err)
                    })
            }else{
                return Promise.reject({errors: 'Invalid email/password'})
            }
        })
        .catch(err=>{
            return Promise.reject(err)
        })
}


userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token, 'jwt@123') 
    }catch(err){
        return Promise.reject(err)
    }
    return User.findOne({ _id: tokenData._id, 'tokens.token': token})
}


const User = mongoose.model('User', userSchema)

module.exports = User