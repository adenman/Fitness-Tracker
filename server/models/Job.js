const { Schema, model } = require('mongoose');

const workoutSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  instuctions:  { 
    type: String,
    required: true,
  },
  
});

const Workout = model('workout', workoutSchema);

module.exports = Workout;
