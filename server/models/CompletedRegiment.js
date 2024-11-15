const { Schema, model } = require('mongoose');

const CompleatedRegimentSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    trim: true,
  },
  workouts: {
    name: {
      type: String,
    },
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

const CompleatedRegiment = model('CompleatedRegiment', CompleatedRegimentSchema);

module.exports = CompleatedRegiment;
