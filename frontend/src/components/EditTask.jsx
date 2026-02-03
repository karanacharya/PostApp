import React, { useState, useEffect } from 'react'
import axios from 'axios';

const EditTask = ({ isOpen, onClose, task, onUpdateTask }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title || '',
        description: task.description || ''
      })
    }
  }, [task])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // call the api to edit the task with task ID in the URL
      const res = await axios.put(`http://localhost:3000/api/auth/v1/task/edittask/${task._id}`, {
        title: taskData.title,
        description: taskData.description
      },
        { withCredentials: true }
      )

      alert(res.data.message || 'Task updated successfully');
      onUpdateTask(res.data.task || task)
      onClose()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update task')
    }
  }

  if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Task</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter task description"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTask
