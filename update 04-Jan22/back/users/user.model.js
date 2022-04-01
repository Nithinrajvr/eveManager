var dbConn = require('../../config/db.config');

var Users = function(users){
    this.fullname= users.fullname;
    this.email=users.email;
    this.password=users.password;
    this.mobile=users.mobile;
}
// Get ALl Users

Users.getUsers=(result=>{
    dbConn.query('SELECT * FROM users',(err,res)=>{
    if(err){
        console.log('ERROR WHILE FETCHING USERS',err);
        result(null,err);
    }else{
console.log('Successfully Fetching USERS');
result(null,res);
    }
    });
})

// check Login by ID 
Users.checkLogin2=(email,password,result)=>{
       dbConn.query('Select * from users where  email=? and password=?',(email,password),
       (err,res)=>{
        if(err){
            console.log('ERROR WHILE FETCHING',err);
            result(null,err);
        }else{
    console.log('Successfully Fetching');
    result(null,res);
        }
        
    });
    }
    


    // Post New Movie
Users.addUser=(userdata,result)=>{

    dbConn.query('INSERT INTO users SET ?',userdata,(err,res)=>{
        if(err){
            console.log('ERROR WJILE INSERtiNg');
            result(null,err);
       }else{
           console.log('Created Sussesfully');
           result(null,res);
       }
    })
    }
module.exports = Users;

