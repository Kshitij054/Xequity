const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
});

const ProductInfoSchema = new mongoose.Schema({
    productName: { type: String, required: true },         
    description: { type: String, required: true },         
    tags: { type: [String], required: true },              
    team: { type: [TeamMemberSchema], required: true },    
    images: { type: [String], required: true },           
    email: { type: String, unique: true, required: true }  
});

const ProductInfoModel = mongoose.model("ProductInfo", ProductInfoSchema);

module.exports = ProductInfoModel;
