const { Schema, model } = require('mongoose');
// const { ObjectId } = Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  id_image: { type: ObjectId },
  name: { type: String },
  email: { type: String },
  gravatar: { type: String },
  comment: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = model('Comment', CommentSchema);
