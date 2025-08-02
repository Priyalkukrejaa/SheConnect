const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  date: Date,
  location: String,
  description: String
});

module.exports = mongoose.model('Event', EventSchema);