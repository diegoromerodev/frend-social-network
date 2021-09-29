const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  profile_photo: String,
  birthday: Date,
  facebookId: String,
  sent_requests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  received_requests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  email: String,
  password: { type: String, default: "CatPasswordIsACat" },
});

UserSchema.virtual("full_name").get(function getter() {
  return `${this.first_name} ${this.last_name}`;
});

UserSchema.virtual("formatted_birthday").get(function getter() {
  return DateTime.fromJSDate(this.birthday).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("User", UserSchema);
