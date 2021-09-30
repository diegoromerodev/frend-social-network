const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    text: String,
    created_at: { type: Date, default: Date.now },
    image: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    heading: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

PostSchema.virtual("formatted_creation").get(function getter() {
  return DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual("url_formatter").get(function getter() {
  if (!this.image) return null;
  if (this.image.match(/^https?:\/\//)) {
    return this.image;
  }
  return `http://localhost:3000/images/${this.image}`;
});

module.exports = mongoose.model("Post", PostSchema);
