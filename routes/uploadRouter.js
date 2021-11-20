const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');


const multer = require('multer');

const storage = multer.diskStorage(
    {
        destination: (req, file ,cb)=>{
            cb(null,'public/images');


        },


        fileName: (req,file ,cb)=>{
                cb(null,file.originalname);

        }
    });

const imageFileFilter = ((req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error(' u can only upload images files'),false);



    }else{
            cb(null,true);

    }})

const upload = multer({storage : storage,fileFilter : imageFileFilter})





const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin ,(req, res, next) => {
    res.statusCode=403;
    res.end(' method GET  not supported  on /imagesupload');
})
.post(authenticate.verifyUser , authenticate.verifyAdmin , upload.single('imageFile') ,(req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);

})

.delete(authenticate.verifyUser, authenticate.verifyAdmin ,(req, res, next) => {
    res.statusCode=403;
    res.end(' method DELETE  not supported  on /imagesupload');
})

.put(authenticate.verifyUser, authenticate.verifyAdmin ,(req, res, next) => {
    res.statusCode=403;
    res.end(' method PUT  not supported  on /imagesupload');
})






module.exports = uploadRouter;