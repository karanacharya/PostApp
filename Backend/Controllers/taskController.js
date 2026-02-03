const taskModel = require('../models/taskModel');

// Create a new task
module.exports.addtask = async function (req, res) {
  try {
    const { title, description } = req.body;

    // Get user ID from the middleware 
    const user = req.user._id;

    // Basic validation
    if (!title) {
      return res.status(400).json({
        message: 'Title is required to create a task',
      });
    }

    const task = await taskModel.create({
      title,
      description: description || '',
      user,
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error while creating task',
    });
  }
};

// Get all tasks for the authenticated user
module.exports.gettask = async function (req, res) {
  try {
    // Get user ID from the middleware
    const user = req.user._id;

    // Filter tasks by the authenticated user
    const tasks = await taskModel
      .find({ user })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Tasks fetched successfully',
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error while fetching tasks',
    });
  }
};

// Edit / update a task
module.exports.edittask = async function (req, res) {
  try {
    const { id } = req.params; // Task ID from route parameter
    const { title, description } = req.body;

    // Get user ID from the middleware
    const user = req.user._id;

    if (!id) {
      return res.status(400).json({
        message: 'Task id is required to update a task',
      });
    }

    // Find the task and verify it belongs to the authenticated user
    const task = await taskModel.findById(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    // Update the task
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error while updating task',
    });
  }
};

// Delete a task
module.exports.deletetask = async function (req, res) {
  try {
    const { id } = req.params; // Task ID from route parameter

    // Get user ID from the middleware
    const user = req.user._id;

    if (!id) {
      return res.status(400).json({
        message: 'Task id is required to delete a task',
      });
    }

    // Find the task and verify it belongs to the authenticated user
    const task = await taskModel.findById(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }


    // Delete the task
    const deletedTask = await taskModel.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error while deleting task',
    });
  }
};