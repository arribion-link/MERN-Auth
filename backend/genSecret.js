import crypto from "crypto";

// Create a SHA-256 hash of a string
const hash = crypto
  .createHash("sha256")
  .update("Hello, Node.js!")
  .digest("hex");

console.log("SHA-256 Hash:", hash);
