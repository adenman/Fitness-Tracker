const { Schema, model } = require('mongoose');

const CompletedRegimentSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    trim: true,
  },
  progressPic:{
    type: String
  },
  time: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const CompleatedRegiment = model('CompletedRegiment', CompletedRegimentSchema);

module.exports = CompleatedRegiment;
