const Task = require('../models/task')


//get
module.exports.list = (req,res)=>{ 
    Task.find({user: req.user._id}).populate('labels') 
    .then((tasks)=>{
         res.json(tasks)
    })
    .catch((err)=>{
        res.json(err)
    })
}
 
//post
module.exports.create = (req,res)=>{                 
    const body = req.body  
    const task = new Task(body) 
    task.user = req.user._id
    task.populate("labels").execPopulate()
    task.save()  
        .then((task)=>{
            res.json(task)  
        })
        .catch((err)=>{
            res.json(err)
        })
}
 
//get 
module.exports.show = (req,res)=>{
    const id = req.params.id
    Task.findOne({_id: id, user:req.user._id}).populate("labels")
        .then((task)=>{
            if(task){
                res.json(task)
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

//delete
module.exports.destroy = (req,res)=>{
    const id = req.params.id
    Task.findOneAndDelete({_id: id, user:req.user._id})
        .then((task)=>{
            if(task){
                res.json(task)
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

//put
module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Task.findOneAndUpdate({_id: id, user:req.user._id}, body, {new:true, runValidators : true}).populate("labels")
        .then((task)=>{
            if(task){
                res.json(task)
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}