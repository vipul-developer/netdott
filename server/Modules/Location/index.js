const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name:{
        type: String,
        maxlength: 100,
        required: true,
        unique: 1
    },
    countryName:{
        type: String,
        maxlength: 100,
        required: true,
        unique: 1
    },
    stateName:{
        type: String,
        maxlength: 100,
        required: true,
        unique: 1
    },
    citiesName:{
        type: String,
        maxlength: 100,
        required: true,
        unique: 1
    },
    pinCode:{
        type: String,
        maxlength: 100,
        required: true,
        unique: 1
    },
    address:{
        type: Array,
        default:[{"address1":"","address2":"","address3":""}],
        required:true
    },
    uniqueId:{
        type: String,
        required:true,
        maxlength: 16,
        unique: 1
    },
    linkId:{
        type: String,
        required: true
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
        required:true
    }
},{timestamps:true});
const Location = mongoose.model("m_location",LocationSchema);
module.exports = { Location };