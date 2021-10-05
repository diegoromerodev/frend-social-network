const mongoose = require("mongoose");

const { Schema } = mongoose;

const NotificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
  url: String,
  read: { Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", NotificationSchema);
