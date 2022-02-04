const RandomNumber = require("randomstring");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { Location } = require("../../Modules/Location");


const linkId = RandomNumber.generate({
    length: 8,
    charset: "hex",
    capitalization: "uppercase"
});

const uniqueId = RandomNumber.generate({
    length: 12,
    charset: "numeric"
});


exports.newLocationReg = (req,res,next) => {
    const location = new Location(req.body);
    location.uniqueId = uniqueId;
    location.linkId = linkId;
    Location.findOne({name:req.body.name}).exec((err,loc) => {
        if(err) return res.status(400).send(err);
        if(loc) return res.json({success:false,message:`location is already registered in our database with below details ${req.body.name}`});
        location.save((err,doc) => {
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({
                success: true,
                loc: doc
            });
        })
    })
}