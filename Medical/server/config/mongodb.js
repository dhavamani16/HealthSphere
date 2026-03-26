import mongoose from "mongoose";

const connectDB = async () => {
  // Prevent duplicate connections
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to the database");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "test";

  if (!mongoUri) {
    console.error(
      '❌ Missing MONGODB_URI in environment variables. Create `Medical/server/.env` and set MONGODB_URI.'
    );
    process.exit(1);
  }

  // Attach listeners only once
  mongoose.connection.once("connected", () => {
    console.log("✅ Database connected successfully");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🔁 Database reconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ Database connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Database disconnected");
  });

  try {
    await mongoose.connect(mongoUri, {
      dbName,
      serverSelectionTimeoutMS: 5000, // Fail fast if can't reach server
      socketTimeoutMS: 45000,         // Drop idle sockets
      family: 4,                      // Use IPv4 (faster DNS)
    });
  } catch (err) {
    console.error("❌ Failed to connect to the database:", err.message);
    process.exit(1); // Stop app if DB is critical
  }
};

export default connectDB;



// Do not use '@' symbol in your databse user's password else it will show an error.

//i triend hard to make the code systematics so it can arrange better . 
// i have completed the server first then one by one pushed all the code file to it can be easy to understand thanks 