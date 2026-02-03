const express = require('express');
const router = express.Router();
const {
  addtask,
  gettask,
  edittask,
  deletetask,
} = require('../Controllers/taskController');
const isLoggedIn = require('../middleware/isLoggedIn');

// Create task
router.post('/addtask', isLoggedIn, addtask);

// Get tasks (optionally by user via query param)
router.get('/gettask',isLoggedIn, gettask);

// Edit task by id (sent as route param)
router.put('/edittask/:id',isLoggedIn, edittask);

// Delete task by id (sent as route param)
router.delete('/deletetask/:id',isLoggedIn, deletetask);

module.exports = router;
