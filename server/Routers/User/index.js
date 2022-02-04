const RandomNumber = require("randomstring");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { User } = require("../../Modules/User");


const linkId = RandomNumber.generate({
    length: 8,
    charset: "hex",
    capitalization: "uppercase"
});

const uniqueId = RandomNumber.generate({
    length: 12,
    charset: "alphanumeric",
    capitalization: "uppercase"
});

exports.userAuth = (req, res, next) => {
    res.status(200).json({
        user: req.user,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true
    })
};

exports.newUserReg = (req, res, next) => {
    const user = new User(req.body);
    user.uniqueId = uniqueId;
    user.linkId = linkId;
    User.findOne({"location":req.body.location,"agency":req.body.agency,"firstName":req.body.firstName,"userName":req.body.userName}).populate("location").populate("agency").exec((err,doc) => {
        if(err) return res.status(400).send(err);
        if(doc) return res.json({success:false,message:`user is already registered in our database with below details ${req.body.firstName}`});
        user.save((err,doc) => {
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({
                success: true,
                user: doc
            });
        })
    })
};

exports.regUserLogin = (req, res, next) => {
    User.findOne({$or:[{"userName":req.body.userName},{"emailAddress":req.body.userName},{"mobileNumber":req.body.userName}],"isActive":1}).populate("location").populate("agency").exec((err,user) => {
        if(!user) return res.json({ loginSuccess: false,message: "login failed: Sorry, something went wrong there,Please check username or password and Try again. !"});
        if(!user.isActive) return res.json({ loginSuccess: false, message: "Auth failed, account not active !"});
        user.comparePassword(req.body.password,(err,isMatch) => {
            if(!isMatch) return res.json({ loginSuccess: false, message: "login failed: Sorry, something went wrong there,Please check username or password and Try again. !" });
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                req.session.w_auth = user.token;
                req.session.uniqueId = user.uniqueId;
                req.session.loggedIn = true;
                req.session.location = user.location;
                req.session.agency = user.agency;
                req.session.user = user;
                res.cookie("w_auth",user.token).status(200).json({
                    loginSuccess: true,
                    message: "Login Success Welcome !........",
                    user: user
                });
            });
        });
    });
};

exports.userLogout = ( req, res, next ) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: " " },
        (err,doc) => {
            if(err) return res.json({ success: false });
            return res.status(200).send({ success: true,message:"You are logged in !" });
        }
    )
    req.session.destroy();
};
