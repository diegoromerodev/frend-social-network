const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  text: String,
  created_at: { type: Date, default: Date.now },
  image: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  heading: String,
});

PostSchema.virtual('formatted_creation').get(function getter() {
  return DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Post', PostSchema);
