import { useState } from "react"
import { motion } from "framer-motion"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import { cn } from "@/utils/cn"

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete, categories = [] }) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    setIsCompleting(true)
    await onToggleComplete(task.Id)
    setTimeout(() => setIsCompleting(false), 300)
  }

  const getDueDateInfo = (dueDate) => {
    if (!dueDate) return null
    
    const date = new Date(dueDate)
    const now = new Date()
    
    if (isToday(date)) {
      return { text: "Due today", variant: "warning", urgent: true }
    } else if (isTomorrow(date)) {
      return { text: "Due tomorrow", variant: "primary", urgent: false }
    } else if (isPast(date) && !task.completed) {
      return { text: "Overdue", variant: "error", urgent: true }
    } else {
      return { text: `Due ${format(date, "MMM d")}`, variant: "default", urgent: false }
    }
  }

  const getPriorityInfo = (priority) => {
    const priorities = {
      high: { text: "High", variant: "error", icon: "AlertTriangle" },
      medium: { text: "Medium", variant: "warning", icon: "AlertCircle" },
      low: { text: "Low", variant: "success", icon: "Minus" }
    }
    return priorities[priority] || priorities.medium
  }

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName)
    return category?.color || "#6366f1"
  }

  const dueDateInfo = getDueDateInfo(task.dueDate)
  const priorityInfo = getPriorityInfo(task.priority)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2, shadow: "0 8px 25px rgba(0,0,0,0.12)" }}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-slate-100 p-5 transition-all duration-300 group hover:shadow-md",
        task.completed && "opacity-80"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            className={cn(
              "transition-all duration-300",
              isCompleting && "animate-bounce-scale"
            )}
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-lg font-semibold text-slate-900 mb-2 transition-all duration-200",
            task.completed && "task-complete",
            !task.completed && "task-incomplete"
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-slate-600 text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Category */}
            <Badge 
              variant="outline" 
              className="text-white border-0 font-medium"
              style={{ 
                backgroundColor: getCategoryColor(task.category),
                color: "white"
              }}
            >
              {task.category}
            </Badge>

            {/* Priority */}
            <Badge variant={priorityInfo.variant}>
              <ApperIcon name={priorityInfo.icon} size={12} className="mr-1" />
              {priorityInfo.text}
            </Badge>

            {/* Due Date */}
            {dueDateInfo && (
              <Badge 
                variant={dueDateInfo.variant}
                className={cn(
                  dueDateInfo.urgent && "animate-pulse"
                )}
              >
                <ApperIcon name="Calendar" size={12} className="mr-1" />
                {dueDateInfo.text}
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
          >
            <ApperIcon name="Edit2" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.Id)}
            className="h-8 w-8 hover:bg-error/10 hover:text-error"
          >
            <ApperIcon name="Trash2" size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard