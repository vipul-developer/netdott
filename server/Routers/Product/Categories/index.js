const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;
const RandomNumber = require("randomstring");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { Categories } = require("../../../Modules/Product/Categories");

const linkId = RandomNumber.generate({
    length: 8,
    charset: "hex",
    capitalization: "uppercase"
});
const barcode = RandomNumber.generate({
    length: 16,
    charset: "alphanumeric"
});


exports.newCategoriesReg = (req,res,next) => {
    const categories = new Categories(req.body);
    categories.barcode = barcode;
    categories.linkId = linkId;
    categories.location = req.session.location._id;
    categories.agency = req.session.agency._id;

    Categories.findOne({"categorieName":req.body.categorieName,"location":req.session.location._id,"agency":req.session.agency._id}).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        if(doc) return res.json({success:false,message:`category is already registered in our database with below details ${req.body.categorieName}`});
        categories.save((err,cat) => {
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({
                success: true,
                categories: cat
            });
        })
    })
};

/// /api/categories/categoriesbyid?id=hshshhhshhshs&type=single

exports.getCategoriesById = (req,res,next) => {
    let type = req.query.type;
    let items = req.query.id;
    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
        })
    }
    Categories.find({"_id":{$in:items}}).exec((err,docs) => {
        return res.status(200).send(docs);
    })
};
//By ARRIVAL
 // /api/categories/categories?sortBy=createdAt&order=desc&limit=4

 //By SELl
  // /api/categories/categories?sortBy=sold&order=desc&limit=4
exports.getCategoriesBySort = (req,res,next) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Categories.find().sort([[sortBy,order]]).limit(limit).exec((err,docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
};

exports.categoriesUpdateById = (req,res,next) => {
    
}