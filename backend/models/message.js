const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    sent_on: { type: Date, default: Date.now },
    text: String,
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

MessageSchema.virtual("formatted_date").get(function getter() {
  return DateTime.fromJSDate(this.sent_on).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Message", MessageSchema);
