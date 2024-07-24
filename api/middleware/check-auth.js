const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify=jwt.verify(token,'this is dummy text');
        if(verify.userType=='admin'){
            next();
        }
        else{
            res.status(401).json({
                msg:'not admin'
            })
        }
    }
    catch(error){
        return res.status(401).json({
            msg:'invalid token'
        })
    }
}
