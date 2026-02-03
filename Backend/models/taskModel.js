const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minLength: [3, 'Task title must be at least 3 characters']
  },
  description: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User is required for a task']
  }
}, {
  timestamps: true
});module.exports = mongoose.model('task', taskSchema);
