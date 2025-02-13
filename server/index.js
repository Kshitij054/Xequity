const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const ProfileInfoModel = require("./models/ProfileInfo");
const ProfilePicModel = require("./models/ProfilePic"); 
const multer = require("multer");
const path = require("path");
const ProductInfoModel = require("./models/ProductInfo");  
const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect("mongodb://localhost:27017/Xequity", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");  
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only images are allowed!"));
        }
    },
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ status: "Success", user: { name: user.name, email: user.email } });
                } else {
                    res.json("Invalid credentials");
                }
            } else {
                res.json("Email not registered");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        });
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await UserModel.create({ name, email, password });

        await ProfileInfoModel.create({ email });
        await ProfilePicModel.create({ email });  

        res.json({ status: "Success", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create user or profile" });
    }
});

app.post("/profile", async (req, res) => {
    const { email, firstName, lastName, mobile, headline, experience, education, location, description } = req.body;

    try {
        const updateFields = {
            firstName,
            lastName,
            mobile,
            headline,
            experience,
            location,
            description,
        };

        if (education && education.length > 0) {
            updateFields.education = education;
        }

        if (experience && experience.length > 0) {
            updateFields.experience = experience;
        }

        const updatedProfile = await ProfileInfoModel.findOneAndUpdate(
            { email },
            { $set: updateFields },
            { new: true, upsert: true }
        );

        res.json({ status: "Success", profile: updatedProfile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save profile information" });
    }
});

app.post("/profile/education", async (req, res) => {
    const { email, schoolName, startYear, endYear, courseName } = req.body;

    try {
        const profile = await ProfileInfoModel.findOneAndUpdate(
            { email },
            {
                $push: {
                    education: { schoolName, startYear, endYear, courseName },
                },
            },
            { new: true }
        );

        if (profile) {
            res.json({ status: "Success", profile });
        } else {
            res.status(404).json({ status: "Error", message: "Profile not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add education entry" });
    }
});

app.post("/profile/experience", async (req, res) => {
    const { email, companyName, role, startYear, endYear } = req.body;

    try {
        const profile = await ProfileInfoModel.findOneAndUpdate(
            { email },
            {
                $push: {
                    experience: { companyName, role, startYear, endYear },
                },
            },
            { new: true }
        );

        if (profile) {
            res.json({ status: "Success", profile });
        } else {
            res.status(404).json({ status: "Error", message: "Profile not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add experience entry" });
    }
});

app.get("/profiles", async (req, res) => {
    try {
        const profiles = await ProfileInfoModel.find(); 
        res.json({ status: "Success", profiles });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch profiles" });
    }
});

app.get("/profile/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const profile = await ProfileInfoModel.findOne({ email });
        if (profile) {
            res.json({ status: "Success", profile });
        } else {
            res.status(404).json({ status: "Not Found", profile: null });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve profile information" });
    }
});

app.post("/profile/upload", upload.single("profilePic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: "Failed", message: "No file uploaded" });
        }

        const { email } = req.body;
        const profilePicPath = `http://localhost:3001/uploads/${req.file.filename}`;

        const updatedProfile = await ProfilePicModel.findOneAndUpdate(
            { email },
            { profilePic: profilePicPath },
            { upsert: true, new: true }
        );

        res.status(200).json({ status: "Success", profilePic: updatedProfile });
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ status: "Failed", message: "Error uploading profile picture" });
    }
});

app.get("/profile/photo/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const profile = await ProfilePicModel.findOne({ email });

        if (!profile || !profile.profilePic) {
            return res.status(404).json({ status: "Failed", message: "Profile picture not found" });
        }

        res.status(200).json({ profilePic: profile.profilePic });
    } catch (error) {
        console.error("Error fetching profile picture:", error);
        res.status(500).json({ status: "Failed", message: "Error fetching profile picture" });
    }
});

app.delete("/profile/education", async (req, res) => {
    const { email, educationId } = req.body;

    try {
        const profile = await ProfileInfoModel.findOneAndUpdate(
            { email },
            {
                $pull: { education: { _id: educationId } }, 
            },
            { new: true }
        );

        if (profile) {
            res.json({ status: "Success", profile });
        } else {
            res.status(404).json({ status: "Error", message: "Profile not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete education entry" });
    }
});

app.delete("/profile/experience", async (req, res) => {
    const { email, experienceId } = req.body;

    try {
        const profile = await ProfileInfoModel.findOneAndUpdate(
            { email },
            {
                $pull: { experience: { _id: experienceId } }, 
            },
            { new: true }
        );

        if (profile) {
            res.json({ status: "Success", profile });
        } else {
            res.status(404).json({ status: "Error", message: "Profile not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete experience entry" });
    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await ProductInfoModel.find(); 
        res.json({ status: "Success", products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ status: "Error", message: "Failed to fetch products" });
    }
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
