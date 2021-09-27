const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotificationSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  text: String,
  url: [String],
  read: Boolean,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', NotificationSchema);
