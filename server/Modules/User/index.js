const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_I = 10;
const RandomNumber = require("randomstring");
require("dotenv").config();
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    title:{
        type:String,
        maxlength:5,
        required:true,
        unique:1
    },
    firstName:{
        type: String,
        maxlength: 100,
        required: true,
    },
    middleName:{
        type: String,
        maxlength: 100,
        required: false,
    },
    lastName:{
        type: String,
        maxlength: 100,
        required: true,
    },
    userName:{
        type: String,
        maxlength: 150,
        required: true,
        unique: 1
    },
    password:{
        type: String,
        required: true,
        unique:1,
    },
    comfPassword:{
        type: String,
        maxlength: 16,
        required: true,
        unique:1,
    },
    dateOfBirth:{
        type: Date,
        required:true,
        trim: true
    },
    address:{
        type: Array,
        default:[{
            line1:"",
            line2:"",
            country:"",
            state:"",
            city:"",
            pinCode:""
        }],
        required:true
    },
    phoneNumber:{
        type: String,
        required:false,
        unique: 1
    },
    mobileNumber:{
        type:String,
        maxlength:10,
        required:true,
        unique: 1
    },
    emailAddress:{
        type:String,
        maxlength:100,
        required:true,
        unique:1
    },
    aadhaarCard:{
        type: String,
        maxlength:16,
        required:true,
        unique:1
    },
    governmentId:{
        type: String,
        required:false,
        unique:1
    },
    panCard:{
        type: String,
        maxlength:12,
        required:true,
        unique:1
    },
    specialInterests:{
        type: String,
        required: false
    },
    learningInstitution:{
        type: String,
        required: false
    },
    maritalStatus:{
        type: String,
        required: true,
        unique:1
    },
    spousesName:{
        type: String,
        required: false,
    },
    spousesEmployer:{
        type: String,
        required: false,
    },
    additionalDetails:{
        type: Array,
        default:[{
            jobInformation:{
                title:"",
                employeeId:"",
                department:"",
                supervisor:"",
                workLocation:"",
                emailAddress:"",
                workNumber:"",
                joiningDate:"",
                salary:""
            },
            emergencyContactInformation:{
                name:"",
                address:"",
                workNumber:"",
                contactNumber:"",
                relationship:"",
                healthConditions:""
            }
        }]
    },
    location:{
        type: Schema.Types.ObjectId,
        ref: "m_location",
        required: true
    },
    agency:{
        type: Schema.Types.ObjectId,
        ref: "m_agency",
        required: true
    },
    personalDetails:{
        type: Array,
        default: []
    },
    uniqueId:{
        type: String,
        required:true,
        maxlength: 16,
        unique: 1
    },
    access:{
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token:{
        type: String
    },
    linkId:{
        type: String,
        required:true,
        unique: 1
    },
    createdAt:{
        type: Date
    },
    updateAt:{
        type: Date
    },
    isActive:{
        type: Number,
        default: 0,
        required: true
    }
},{timestamps: true});
UserSchema.pre("save",function(next){
    var user = this;

    if(user.isModified("password")){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
});

UserSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
};

UserSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET);
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
};

UserSchema.static.findByToken = function(token,cb){
    var user = this;
    jwt.verify(token,process.env.SECRET,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
};

const User = mongoose.model("m_user",UserSchema);
module.exports = { User };