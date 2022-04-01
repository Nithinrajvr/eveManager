const userModel=require('../users/user.model');
var dbConn = require('../../config/db.config');
exports.getUserList=(req,res)=>{
    console.log("All User List-CONTROLLER");
userModel.getUsers((err,users)=>{
      console.log('WORKIN');
    if(err){
        res.send(err);
    }
    res.send(users);
});

}

//Login
exports.checkLogin=(req,res)=>{
    const email=req.body.email;
    const password =req.body.password;
 
    console.log(email);
    console.log(password);

    res.setHeader("Access-Control-Allow-Origin", "*");
    dbConn.query('Select * from users where  email=? AND password=?',[email,password],
    (err,result)=>{
     if(err){
         console.log('ERROR WHILE FETCHING',err);
         res.send({response:'Error',err:err});
     }else{
         if(result.length>0){
               res.send({response:'success',user:result,loggedin:true});
         }else{
             res.send({response:'failure',message:"Wrong Username/Password",loggedin:false});
         }

     }
    
 });
    
}


// Post New Movie
exports.postUser=(req,res)=>{


dbConn.query('INSERT INTO users (fullname,email,password,squestion,answer,mobile)values(?,?,?,?,?,?)',[req.body.fullname,req.body.email,req.body.password,req.body.squestion,req.body.answer,req.body.mobile],(err,result)=>{
    if(err){
        console.log('ERROR WJILE INSERtiNg');
      res.send(err);
   }else{
       console.log('Created Sussesfully');
       //res.send(result);
       res.send({status:true,message:'Created Successfully',inserted:"true"})
   }
})
}


// Post New Movie
exports.addUser=(req,res)=>{
    console.log('New Movie',req.body);
 
  
    // dbConn.query('INSERT INTO users SET ?',req.body,(err,result)=>{
    //     if(err){
    //         console.log('ERROR WJILE INSERtiNg');
    //        res.send(err);
    //    }else{
    //        console.log('Created Sussesfully');
    //       res.send(result);
    //    }
    // })

//     const movieReqData= new movieModel(req.body);
// // check null
// if(req.body.constructor === Object && Object(req.body).length=== 0){
//     res.send(400).send({Sucess:false,message:'Please fill all fields'});
// }else{
//     console.log("valid");
//   movieModel.postMovie(movieReqData,(err,movies)=>{
// if(err){
//         res.send(err);
//         res.json({status:false,message:err})
//     }
    
//             res.json({status:true,message:'Created Successfully'})

//   });
// }

}



exports.myTickets=(req,res)=>{
    console.log('User ID',req.body.userid);
    var sql='Select c1.*,c2.* from booking as c1  INNER JOIN  events as c2 ON c1.eventid=c2.id where c1.userid=? and bstatus=1';
    //var sql='Select c1.* from booking as c1  where c1.userid=?';

dbConn.query(sql,[req.body.userid],(err,result)=>{
    if(err){
        console.log('ERROR WJILE INSERtiNg');
      res.send(err);
   }else{
       console.log('Created Sussesfully');
       console.log(result);
       res.send(result);
       //res.json({status:true,message:'Created Successfully'})
   }
})
}



