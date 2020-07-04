const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

const ctrl = {}

ctrl.index = (req, res) =>{

};

ctrl.create = async (req, res) =>{
    //console.log(req.file);
    const imgUrl = randomNumber();
    console.log(imgUrl);
    const imageTemPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
    
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fs.rename(imageTemPath, targetPath);    
    }

    res.send('Works!');
};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};


module.exports = ctrl;