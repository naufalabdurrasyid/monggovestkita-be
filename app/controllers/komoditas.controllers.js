const Post = require('../model/post.models.js');

exports.komoditas_post=(req,res)=>{
    const post = new Post({
        'foto': req.body.foto,
        'nama_ternak': req.body.nama_ternak,
        'author': req.decoded,
        'asal' : req.body.asal,
        'harga': req.body.harga,
        'lot_tersedia': req.body.lot_tersedia
      })   
      if (req.decoded.roles != "Peternak") {
        res.status(422).json({
            success: false,
            message: 'failed'
        })
    }
    else {  post.save()
.then(result => {
  res.status(201).send({
      result: result
  })
}
).catch(err => {
  res.status(500).send({
      error: err.message
  });
})}
}

exports.komoditas_id=(req,res,next)=>{
    Post.findById( req.params.id, (err, Post)=>{
        if(err){
            res.status(422).json({
                success: false,
                message: 'failed',
                error: err
            })
        }
          else{
            res.status(200).json({
                data: Post,
                success:true,
                message:"Post found"
            });
          }     
    });
};
    


exports.komoditas_data = (req,res) => {
    Post.find({}, )
     .then((result) => {
      res.status(200)
       .send({
        status: true,
        result: result,
        error: null
       })
     })
     .catch(err => {
       res.status(500).send({
           error: err.message
       });
     })
   }