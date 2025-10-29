const mongoose = require('mongoose');

const committeeSchema = new mongoose.Schema({
  committeeName: String,
  committeeID: String,
  chairperson: String,
  members: [String],  
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Committee', committeeSchema);
