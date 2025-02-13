const mongoose = require("mongoose");

const ProfilePicSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    profilePic: {
        type: String,
        default: "http://localhost:3001/uploads/Investor.jpg"  
    },  
});

const ProfilePicModel = mongoose.model("ProfilePic", ProfilePicSchema);

module.exports = ProfilePicModel;
