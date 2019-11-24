const User = require('../models/user')
const _ = require("lodash")

//register
module.exports.create = (req, res)=>{
    const body = _.pick(req.body, ["username", "email", "password", "mobile"])            //req.body
    const user = new User(body)
    user.save()
        .then(user=>{
            res.json(_.pick(user, ["_id", "username", "email"]))
        })
        .catch(err=>{
            res.json(err)
        })
}

//login
module.exports.login = (req, res)=>{
    const body = _.pick(req.body,["email", "password"])              
    User.findByCredentials(body.email, body.password)
        .then(user=>{
            user.generateToken()
                .then(token=>{
                    res.send({token})
                })
                .catch(err=>{
                    res.json(err)
                })
        })
        .catch(err=>{
            res.json(err)
        })
}

//account
module.exports.show = (req, res)=>{
    res.json(_.pick(req.user, ["_id", "username", "email"]))
}


//logout
module.exports.destroy =(req, res)=>{
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {'$pull':{'tokens':{'token':token}}})
        .then(()=>{
            res.json({notice: 'successfully logged out'})
        })
        .catch(err=>{
            res.json(err)
        })
}

//logoutAll
module.exports.destroyAll =(req, res)=>{
    const {user} = req
    User.findByIdAndUpdate(user._id, {'$set':{'tokens':[]}})
        .then(()=>{
            res.json({notice:'logged out from all the devices'})
        })
        .catch(err=>{
            res.json(err)
        })
}

//profile-pic
module.exports.profile = (req, res) =>{
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            res.render('index', {
                msg: err
            })
        }
        res.json({
            success: true,
            message: `Image uploaded!, ${req.file}`
        })

        // Everything went fine
    })
}