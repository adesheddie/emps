var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';
AWS.config.update({
    accessKeyId: "AKIAJBIQ3NC5LD25XPEA",
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
    bucket: 'node-images-test',
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
