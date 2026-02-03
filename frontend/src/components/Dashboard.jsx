import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddTask from './AddTask'
import Profile from './Profile'
import EditTask from './EditTask'

const Dashboard = () => {
  const navigate = useNavigate()
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        'http://localhost:3000/api/auth/v1/task/gettask',
        { withCredentials: true }
      )
      setTasks(res.data.tasks || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      alert(error.response?.data?.message || 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setIsEditTaskOpen(true)
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ))
    setSelectedTask(null)
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/auth/v1/task/deletetask/${taskId}`,
        { withCredentials: true }
      )
      alert('Task deleted successfully')
      // Refetch all tasks from the database
      await fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
      alert(error.response?.data?.message || 'Failed to delete task')
    }
  }

  const handleLogout = async () => {
    try {
      await axios.delete(
        'http://localhost:3000/api/auth/v1/user/logout',
        { withCredentials: true }
      )
      alert('Logged out successfully')
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
      alert(error.response?.data?.message || 'Failed to logout')
      // Navigate to login even if API call fails
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">PostApp</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Add Task
              </button>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
              >
                <span className="text-xl">👤</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading tasks...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                <button
                  onClick={() => handleEditTask(task)}
                  className="text-gray-500 hover:text-blue-500 transition"
                  title="Edit Task"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-gray-500 hover:text-red-500 transition ml-2"
                  title="Delete Task"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="flex items-center justify-between">
               
              </div>
            </div>
          ))}
          </div>
        )}
        {!loading && tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tasks yet. Click "Add Task" to create one!</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <AddTask
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />
      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <EditTask
        isOpen={isEditTaskOpen}
        onClose={() => {
          setIsEditTaskOpen(false)
          setSelectedTask(null)
        }}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  )
}

export default Dashboard
