const RandomNumber = require("randomstring");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { Agency } = require("../../Modules/Agency");


const linkId = RandomNumber.generate({
    length: 8,
    charset: "hex",
    capitalization: "uppercase"
});

const uniqueId = RandomNumber.generate({
    length: 12,
    charset: "numeric"
});


exports.newAgencyReg = (req,res,next) => {
    const agency = new Agency(req.body);
    agency.uniqueId = uniqueId;
    agency.linkId = linkId;
    Agency.findOne({name:req.body.name}).exec((err,age) => {
        if(err) return res.status(400).send(err);
        if(age) return res.json({success:false,message:`Agency is already registered in our database with below details ${req.body.name}`});
        agency.save((err,doc) => {
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({
                success: true,
                agency: doc
            });
        })
    })
}