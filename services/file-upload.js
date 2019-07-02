var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';
AWS.config.update({
    accessKeyId: "AKIAVBW4WVT7NPK6TCVC",
    secretAccessKey: "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",
});

var multer = require('multer')
var multerS3 = require('multer-s3')
 

var s3 = new AWS.S3({ /* ... */ })
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
  }
var upload = multer({
    fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'node-images-s3',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'testing-images'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
module.exports=upload;
