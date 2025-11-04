import tasksData from "@/services/mockData/tasks.json"
import { toast } from "react-toastify"

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(200)
    // Get tasks from localStorage if available, otherwise use mock data
    const savedTasks = localStorage.getItem("taskflow_tasks")
    if (savedTasks) {
      tasks = JSON.parse(savedTasks)
    }
    return [...tasks]
  },

  async getById(id) {
    await delay(150)
    const savedTasks = localStorage.getItem("taskflow_tasks")
    if (savedTasks) {
      tasks = JSON.parse(savedTasks)
    }
    const task = tasks.find(task => task.Id === parseInt(id))
    return task ? { ...task } : null
  },

  async create(taskData) {
    await delay(250)
    const savedTasks = localStorage.getItem("taskflow_tasks")
    if (savedTasks) {
      tasks = JSON.parse(savedTasks)
    }

    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) + 1 : 1
    const newTask = {
      Id: newId,
      title: taskData.title,
      description: taskData.description || "",
      completed: false,
      category: taskData.category || "personal",
      dueDate: taskData.dueDate || null,
      priority: taskData.priority || "medium",
      createdAt: new Date().toISOString(),
      completedAt: null
    }

    tasks.push(newTask)
    localStorage.setItem("taskflow_tasks", JSON.stringify(tasks))
    
    toast.success("Task created successfully!")
    return { ...newTask }
  },

  async update(id, taskData) {
    await delay(200)
    const savedTasks = localStorage.getItem("taskflow_tasks")
    if (savedTasks) {
      tasks = JSON.parse(savedTasks)
    }

    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id))
    if (taskIndex === -1) {
      toast.error("Task not found")
      return null
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...taskData,
      completedAt: taskData.completed && !tasks[taskIndex].completed 
        ? new Date().toISOString() 
        : !taskData.completed 
        ? null 
        : tasks[taskIndex].completedAt
    }

    tasks[taskIndex] = updatedTask
    localStorage.setItem("taskflow_tasks", JSON.stringify(tasks))

    if (taskData.completed !== undefined) {
      if (taskData.completed) {
        toast.success("Task completed! Great job! 🎉")
      } else {
        toast.info("Task marked as incomplete")
      }
    } else {
      toast.success("Task updated successfully!")
    }
    
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(200)
    const savedTasks = localStorage.getItem("taskflow_tasks")
    if (savedTasks) {
      tasks = JSON.parse(savedTasks)
    }

    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id))
    if (taskIndex === -1) {
      toast.error("Task not found")
      return false
    }

    const deletedTask = tasks[taskIndex]
    tasks.splice(taskIndex, 1)
    localStorage.setItem("taskflow_tasks", JSON.stringify(tasks))
    
    toast.success(`"${deletedTask.title}" deleted successfully`)
    return true
  },

  async toggleComplete(id) {
    const savedTasks = localStorage.getItem("taskflow_tasks")
    if (savedTasks) {
      tasks = JSON.parse(savedTasks)
    }

    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) return null

    return this.update(id, { completed: !task.completed })
  }
}