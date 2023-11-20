const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");

const app = express();
const url = "mongodb://localhost:27017/";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'HumanCpu' });

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
    resp.json({ message: "App is Working" });
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const ScoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    test: {
    type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    } );

const User = mongoose.model('users', UserSchema);
const Score = mongoose.model('scores', ScoreSchema);

app.post("/", async (req, resp) => {
    try {
        const { name, password, loginMode } = req.body;

        if (loginMode) {
            // Login
            const user = await User.findOne({ name, password });

            if (user) {
                resp.json({ success: true, message: "Login successful" });
            } else {
                resp.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } else {
            // Signup
            const existingUser = await User.findOne({ name });

            if (existingUser) {
                return resp.status(400).json({ success: false, message: "User already exists" });
            }

            const newUser = new User({ name, password });
            const result = await newUser.save();

            resp.json({ success: true, message: "User registered successfully", data: result.toObject() });
        }
    } catch (e) {
        console.error(e);
        resp.status(500).json({ success: false, message: "Something Went Wrong" });
    }
});

app.post("/AimTrainer", async (req, resp) => {
    try {
        const { name, score } = req.body;
        resp.json({ success: true, message: "Score saved successfully" });
        const newScore = new Score({ name, score , test: "AimTrainer"});
        resp.json({ success: true, message: "Score saved successfully", data: newScore.toObject() });
    }
     catch (e) {
        console.error(e);
        resp.status(500).json({ success: false, message: "Something Went Wrong" });
    }
});

app.post("/ClickSpeed", async (req, resp) => {
    try {
        const { name, score } = req.body;
        resp.json({ success: true, message: "Score saved successfully" });
        const newScore = new Score({ name, score , test: "ClickSpeed"});
        resp.json({ success: true, message: "Score saved successfully", data: newScore.toObject() });
    }
    catch (e) {
        console.error(e);
        resp.status(500).json({ success: false, message: "Something Went Wrong" });
    }
});

app.post("/ReactionTime", async (req, resp) => {
    try {
        const { name, score } = req.body;
        resp.json({ success: true, message: "Score saved successfully" });
        const newScore = new Score({ name, score , test: "ReactionTime"});
        resp.json({ success: true, message: "Score saved successfully", data: newScore.toObject() });
    }
    catch (e) {
        console.error(e);
        resp.status(500).json({ success: false, message: "Something Went Wrong" });
    }
});

app.post("/TypingSpeed", async (req, resp) => {
    try {
        const { name, score } = req.body;
        resp.json({ success: true, message: "Score saved successfully" });
        const newScore = new Score({ name, score , test: "TypingSpeed"});
        resp.json({ success: true, message: "Score saved successfully", data: newScore.toObject() });
    }
    catch (e) {
        console.error(e);
        resp.status(500).json({ success: false, message: "Something Went Wrong" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
