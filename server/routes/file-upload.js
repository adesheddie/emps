var express=require('express');
var router=express.Router();
var employees=require('../models/employees_api')

const upload = require('../../services/file-upload');

const singleUpload = upload.single('image');

router.post('/image-upload', function(req, res) {

  singleUpload(req, res, async function(err) {
    console.log('req for single upload');
    // console.log(req);

    if (err) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }
    let img_url=await req.file.location;
    var data=new employees({
      name:req.body.name,
      age:req.body.age,
      designation:req.body.designation,
      doj:req.body.doj,
      about:req.body.about,
      img:img_url
    })

    data.save(function(err,result){
      if(err) res.status(500).send(err);
      else
      res.status(200).send("Success");
    });

    // return res.json({'imageUrl': req.file.location});
  });
});
router.get('/list',function(req,res){
  employees.find({},function(err,result){
    if(err) res.status(500).send(err);
    res.status(200).send(JSON.stringify(result));
  })
})

module.exports = router;