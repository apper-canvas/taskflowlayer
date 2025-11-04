import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

const AddTaskForm = ({ onAddTask, categories = [] }) => {
  const [title, setTitle] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsAdding(true)
    await onAddTask({
      title: title.trim(),
      category: "personal",
      priority: "medium"
    })
    setTitle("")
    setIsAdding(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6"
    >
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="What needs to be done today?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            className="text-base placeholder:text-slate-400 border-slate-200 focus:border-primary focus:ring-primary/20"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="default"
          disabled={!title.trim() || isAdding}
          className={cn(
            "h-12 px-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-primary/25 transform transition-all duration-200",
            isAdding && "animate-bounce-scale"
          )}
        >
          {isAdding ? (
            <ApperIcon name="Loader2" size={20} className="animate-spin" />
          ) : (
            <ApperIcon name="Plus" size={20} />
          )}
        </Button>
      </form>
      
      <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
        <ApperIcon name="Lightbulb" size={14} />
        <span>Press Enter to quickly add a task</span>
      </div>
    </motion.div>
  )
}

export default AddTaskForm