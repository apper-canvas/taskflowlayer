import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { isPast, isToday } from "date-fns"
import { taskService } from "@/services/api/taskService"
import { categoryService } from "@/services/api/categoryService"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import AddTaskForm from "@/components/molecules/AddTaskForm"
import FilterTabs from "@/components/molecules/FilterTabs"
import TaskCard from "@/components/molecules/TaskCard"
import EditTaskModal from "@/components/molecules/EditTaskModal"
import DeleteConfirmModal from "@/components/molecules/DeleteConfirmModal"

const TaskManager = () => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)

  // Load initial data
  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      console.error("Error loading data:", err)
      setError("Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Filter tasks based on active filter
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case "active":
        return tasks.filter(task => !task.completed)
      case "completed":
        return tasks.filter(task => task.completed)
      case "overdue":
        return tasks.filter(task => 
          !task.completed && 
          task.dueDate && 
          isPast(new Date(task.dueDate)) && 
          !isToday(new Date(task.dueDate))
        )
      default:
        return tasks
    }
  }, [tasks, activeFilter])

  // Calculate task counts for filter tabs
  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      active: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length,
      overdue: tasks.filter(task => 
        !task.completed && 
        task.dueDate && 
        isPast(new Date(task.dueDate)) && 
        !isToday(new Date(task.dueDate))
      ).length
    }
  }, [tasks])

  // Add new task
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
    } catch (err) {
      console.error("Error adding task:", err)
    }
  }

  // Toggle task completion
  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId)
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === taskId ? updatedTask : task
        ))
      }
    } catch (err) {
      console.error("Error toggling task:", err)
    }
  }

  // Edit task
  const handleEditTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.update(taskId, taskData)
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === taskId ? updatedTask : task
        ))
      }
    } catch (err) {
      console.error("Error updating task:", err)
    }
  }

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      const success = await taskService.delete(taskId)
      if (success) {
        setTasks(prev => prev.filter(task => task.Id !== taskId))
      }
    } catch (err) {
      console.error("Error deleting task:", err)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="max-w-4xl mx-auto">
      {/* Add Task Form */}
      <AddTaskForm onAddTask={handleAddTask} categories={categories} />

      {/* Filter Tabs */}
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        taskCounts={taskCounts}
      />

      {/* Task List */}
      <AnimatePresence mode="wait">
        {filteredTasks.length === 0 ? (
          <Empty
            title={
              activeFilter === "completed" ? "No completed tasks" :
              activeFilter === "active" ? "No active tasks" :
              activeFilter === "overdue" ? "No overdue tasks" :
              "No tasks yet"
            }
            message={
              activeFilter === "completed" ? "Complete some tasks to see them here!" :
              activeFilter === "active" ? "All caught up! Add a new task or check completed ones." :
              activeFilter === "overdue" ? "Great! You're on top of your deadlines." :
              "Add your first task to get started on your productivity journey!"
            }
            icon={
              activeFilter === "completed" ? "CheckCircle" :
              activeFilter === "active" ? "Clock" :
              activeFilter === "overdue" ? "AlertTriangle" :
              "CheckSquare"
            }
            showAction={activeFilter === "all"}
            actionText="Add Your First Task"
            onAction={() => document.querySelector('input[placeholder*="What needs to be done"]')?.focus()}
          />
        ) : (
          <motion.div className="space-y-3">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.Id}
                  task={task}
                  categories={categories}
                  onToggleComplete={handleToggleComplete}
                  onEdit={setEditingTask}
                  onDelete={setDeletingTask}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Task Modal */}
      <EditTaskModal
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleEditTask}
        categories={categories}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        task={deletingTask}
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteTask}
      />
    </div>
  )
}

export default TaskManager