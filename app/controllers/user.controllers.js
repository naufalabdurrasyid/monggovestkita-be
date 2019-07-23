const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const User = require('../model/user.models.js');
//const ObjectID = require('../model/user.models.js');
const Post = require('../model/post.models.js');
const Invest = require('../model/invest.models.js');
const Lot = require('../model/lot.models.js')

//const Role = require('../model/role.models.js');

exports.create_user = (req, res) => {
    var user = new User({
       _id: req.decoded,
       user_foto: req.body.user_foto,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roles: req.body.roles
    })

if (req.body.roles != "Peternak" && req.body.roles !=  "Investor") {
    res.status(422).json({
        success: false,
        message: 'failed'
    })
}
else {   user.save()
        .then(result => {
            res.status(201).send({
                result: result
            })
        }
        ).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
}
}


    exports.show_user=(req,res,next)=>{
        User.findById( req.params.id, (err, User)=>{
            if(err){
                res.status(422).json({
                    success: false,
                    message: 'failed',
                    error: err
                })
            }
              else{
                res.status(200).json({
                    data: User,
                    success:true,
                    message:"user found"
                });
              }     
        });
    };
    
    exports.update_user=(req,res)=>{
      User.findByIdAndUpdate(req.params.id, {$set:req.body},(err,updatedUser)=>{
          if(err){
              res.send(err)
          }else{
              res.status(200).send({
                  success:true,
                  message:"User profile is sucessfully updated"
              })
          }
      })
  }

  exports.delete_user=(req,res)=>{
    User.findByIdAndRemove(req.params.id , (err)=>{
        if(err){
            res.send(err)
        }else{
            res.status(200).send({
                success:true,
                message:"User profile is sucessfully deleted"
            })
        }
    })
}
  
  exports.user_login=(req,res)=>{
      User.findOne({username:req.body.username}, (err,user)=>{
          if(err){
              res.status(400).json({
                  success:false,
                  message: 'failed'
              })
          }else{
              console.log(user)
              bcrypt.compare(req.body.password, user.password, function(err, response){
                  if(err){
                      res.status(400).json({
                          success: false,
                          message: 'failed'
                      })
                  }else{
                      console.log(response)
                      if(response)
                      
                      {
                          var token = jwt.sign(user.toJSON(), "secret..", {
                              algorithm:'HS256'
                          });
                          

                          res.status(201).json({
                              message: 'You are logged in!',
                              success: true,
                              token: token,
                              id: user.id,
                              roles: user.roles
                          })
                      }else{
                          res.status(401).json({
                              message: 'wrong password or username',
                              success: false,
                              token: token
                          })
                     
                      }
  
                  }
              })
          }
      })
  }
  exports.user_verify=(req,res)=>{ 
    jwt.verify(req.headers.authorization, 'secret..',(err,decoded)=>{
if(err){ 
    res.status(400).json({
    success:false,
    message: err
})
console.log(decoded)
}else{
    res.status(200).send(decoded)
}
    })
  
}

    exports.peternak_data=(req,res)=>{
        _id = req.decoded._id

        Post.find({author:req.params.author}, (err, _id)=>{
            if (req.decoded._id != req.params.author){
                res.status(422).json({
                    success: false,
                    message: 'failed',
                    error: err
                })
            }
              else{  Post.find({author:req.params.author})
                .then(Post => {
                  res.status(201).send({
                      data: Post
                  })
                }
                ).catch(err => {
                  res.status(500).send({
                      error: err.message
                  });
                })}   
        })
    }
    exports.invest_lot = (req, res) => {
        Post.findById(req.params._id, ()=>{
            Post.find({lot_tersedia:req.body.lot_tersedia}, (err,lot)=>{
                var lot = new Lot ({ 
                    posts: req.params.id,
                    investor: req.decoded,
                    lot_tersedia: req.body.lot_tersedia,
                jumlah_lot: req.body.jumlah_lot
            })
                if(req.body.jumlah_lot > req.body.lot_tersedia){
                    res.status(400).json({
                        success:false,
                        message: 'failed'
                    })
                }else {  lot.save()
                    .then(lot => {
                      res.status(201).send({
                          result: lot
                      })
                    }
                    ).catch(err => {
                      res.status(500).send({
                          error: err.message
                      });
                    })}
                })
})}
    exports.user_invest = (req, res) => {
        Lot.findById(req.params._id, (err)=>{
        var invest = new Invest ({ 
            lots: req.params.id,
            investor: req.decoded,
        nama_lengkap: req.body.nama_lengkap,
        nomor_ktp: req.body.nomor_ktp,
        alamat_lengkap: req.body.alamat_lengkap,
        nomor_hp: req.body.nomor_hp,
        email_konfirmasi: req.body.email_konfirmasi,
        metode_pembayaran: req.body.metode_pembayaran,
        jumlah_lot: req.body.jumlah_lot,
        status: "Belum Terbayar"
    })

       
        if (err){
            res.status(422).json({
                success: false,
                message: 'failed',
                err: error
            })
        }
          else {   invest.save()
            .then(result => {
                res.status(201).send({
                    result: result,
                    message: 'investasi berhasil disimpan, detail pembayaran akan kami kirim ke email konfirmasi'
                })
            }
            ).catch(err => {
            res.status(500).send("Fail! Error -> " + err);
        });
    }
                
    } )
}
exports.investor_data=(req,res)=>{
  
Invest.find({investor:req.params.investor},)
.then((result) => {
 res.status(200)
  .send({
   status: true,
   result: result,
  })
})
.catch(err => {
  res.status(500).send({
      error: err.message
  });
})
}
   
exports.update_pembayaran=(req,res)=>{
    console.log(req.params.invest);
    Invest.findById(req.params.invest)
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

    // Invest.findById(req.params.invest, (invest )=>{
    //     console.log(invest);
    //     if(invest.status  !== "Terbayar"){
    //         res.send({
    //         message: "anda belum membayar biaya investasi",
    //         result: invest.status
    //         })
    //         console.log(invest.status)
    //     }else if (invest.status == "Terbayar"){ 
    //         res.send({
    //             success:true,
    //             message:"Selamat Anda telah menjadi investor komoditas ini"
    //         })
    //     }
    //     res.status(500).send(err.message)
    // })
}
