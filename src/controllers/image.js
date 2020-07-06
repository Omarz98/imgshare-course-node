const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const { Image,Comment} = require('../models');
const { ETXTBSY } = require('constants');
const { runInNewContext } = require('vm');
const { json } = require('express');

const ctrl = {}

ctrl.index = async (req, res) =>{
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    //console.log(image);
    const comments = await Comment.find({image_id: image._id});
    res.render('image',{image,comments});
    //console.log('params: ', req.params.image_id);
    //res.render('image', {image});
};

ctrl.create = (req, res) =>{
    //console.log(req.file);
    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({filename: imgUrl});
        if (images > 0) {
            saveImage();
        }else{
            console.log(imgUrl);
            const imageTemPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
    
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTemPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description:  req.body.description
                });
                const imageSaved = await newImg.save();
                //console.log(newImg);  
                res.redirect('/images/' + imgUrl);
                //res.send('Works!')
            }else{
                await fs.unlink(imageTemPath);
                res.status(500).json({error: 'Only Images are allowed'});
            }

            //res.send('Works!');
        }
    };
        
    saveImage();
};

ctrl.like = (req, res) => {

};

ctrl.comment = async (req, res) => {
    //console.log(req.body);
    //
    //console.log(newComment);
    //console.log(req.params.image_id);
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        //console.log(newComment);
        await newComment.save();
        res.redirect('/images/'+ image.uniqueId);
    }
    
};

ctrl.remove = (req, res) => {

};


module.exports = ctrl;