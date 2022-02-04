const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;

const AgencySchema = new Schema({
    name:{
        type: String,
        maxlength:100,
        required: true,
        unique:1
    },
    contactDetails:{
        type: Array,
        default: [],
        required: true
    },
    taxDetails:{
        type: Array,
        default: [],
        unique: 1
    },
    workerDetails:{
        type: Array,
        default: [],
        unique: 1
    },
    departmentDetails:{
        type: Array,
        default: [],
        unique: 1
    },
    bankDetails:{
        type: Array,
        default: [],
        unique: 1
    },
    walletDetails:{
        type: Array,
        default: [],
        unique: 1
    },
    location:{
        type: Schema.Types.ObjectId,
        ref: "m_location",
        required: true
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
const Agency = mongoose.model("m_agency",AgencySchema);
module.exports = { Agency };