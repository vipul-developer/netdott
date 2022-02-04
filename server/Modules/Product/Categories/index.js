const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    categorieName:{
        type: String,
        maxlength: 100,
        required: true,
        unique:1,
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
    description:{
        type: String,
        maxlength:350,
        required: false
    },
    image:{
        type: String,
        required: false,
    },
    barcode:{
        type: String,
        required: true,
        maxlength:16,
        unique:1
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
const Categories = mongoose.model("m_categories",CategoriesSchema);
module.exports = { Categories };