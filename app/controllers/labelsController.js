const Label = require('../models/label')
const Task= require('../models/task')
const mongoose = require('mongoose')

module.exports.list = (req,res)=>{
    Label.find({user: req.user._id})
        .then((labels)=>{
            res.json(labels)
        })
        .catch((err)=>{
            res.json(err)
        })
}

// module.exports.create = (req,res)=>{
//     const body = req.body
//     const label = new Label(body)
//     label.user = req.user._id
//     label.save()
//         .then((label)=>{
//             res.json(label)
//         })
//         .catch((err)=>{
//             res.json(err)
//         })
// }

module.exports.create = (req,res)=>{
    const values = Array.isArray(req.body) ? req.body : [req.body]
    const labels = values.map(body=>{
        const label = new Label(body)
        label.user = req.user._id
        return label
    })
    Label.insertMany(labels)
        .then((labels)=>{
            res.json(labels)
        })
        .catch((err)=>{
            res.json(err)
        })
}


module.exports.show = (req,res)=>{
    const id = req.params.id 
    Promise.all([Label.findOne({_id: id, user:req.user._id}),Task.find({  'labels' : id })])
        .then((values)=>{
            console.log(values[1])
            return res.json({
                label: values[0],
                tasks: values[1]
            })
        })
        .catch((err)=>{
            return res.json(err)
        })
}


module.exports.destroy = (req,res)=>{
    const id = req.params.id 
    Label.findOneAndDelete({_id: id, user:req.user._id})
        .then((label)=>{
            return res.json(label)
        })
        .catch((err)=>{
            return res.json(err)
        })
}


module.exports.update = (req,res)=>{
    const body = req.body
    const id = req.params.id 
    Label.findOneAndUpdate({_id: id, user:req.user._id}, body, {new:true, runValidators:true})
        .then((label)=>{
            return res.json(label)
        })
        .catch((err)=>{
            return res.json(err)
        })
}