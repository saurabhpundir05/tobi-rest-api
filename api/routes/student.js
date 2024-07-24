const express=require('express');
const router=express.Router();
const Student=require('../model/student');
const mongoose=require('mongoose');
const student=require('../model/student');
const checkout=require('../middleware/check-auth');
const checkAuth = require('../middleware/check-auth');

router.get('/',checkAuth,(req,res,next)=>{    // '/' is used to add more directive to studnet
    Student.find().then(result=>{
        res.status(200).json({
            studentData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//get data from mongodb by id
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id).then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//post-to send data to db
router.post('/',(req,res,next)=>{
    const student=new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        gender:req.body.gender,
        email:req.body.email,
        phone:req.body.phone
    })
    student.save().then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//delet req
router.delete('/:id',async(req,res,next)=>{
    try{
        const result=await Student.deleteOne({_id:req.params.id});
        if(result.deletedCount==0){
            return res.status(404).json({
                message:'Student not found'
            });
        }
        res.status(200).json({
            message:'Student delete success'
        });
    }catch(err){
        res.status(500).json({
            error:err.message
        });
    }
});

//put request-update data in db
router.put('/:id',(req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            gender:req.body.gender,
            email:req.body.email,
            phone:req.body.phone
        }
    }).then(result=>{
        res.status(200).json({
            updated_student:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports=router;