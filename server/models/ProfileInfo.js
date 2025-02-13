const mongoose = require("mongoose");

const ProfileInfoSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true }, 
    mobile: String,
    headline: String,
    experience: [
        {
            companyName: { type: String, required: true },
            role: { type: String, required: true },
            startYear: { type: Number, required: true },
            endYear: { type: Number, required: true },
        },
    ], 
    education: [
        {
            schoolName: { type: String, required: true },
            startYear: { type: Number, required: true },
            endYear: { type: Number, required: true },
            courseName: { type: String, required: true },
        },
    ],
    location: String,
    description: String,
});

const ProfileInfoModel = mongoose.model("ProfileInfo", ProfileInfoSchema);

module.exports = ProfileInfoModel;
