// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, "./.env") });

// Import User model (adjust path as needed)
const User = require("./models/User"); // ✅ Make sure this file exists

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    const adminEmail = "admin@example.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists.");
    } else {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      const adminUser = new User({
        email: adminEmail,
        password: "Admin@123",
      });

      await adminUser.save();
      console.log("Admin user created successfully.");
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();

module.exports = createAdmin;
