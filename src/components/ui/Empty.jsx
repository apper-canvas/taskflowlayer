import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No tasks yet", 
  message = "Add your first task to get started on your productivity journey!",
  actionText = "Add Your First Task",
  onAction,
  showAction = true,
  icon = "CheckSquare"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full p-6 mb-6">
        <ApperIcon name={icon} size={64} className="text-primary" />
      </div>
      
      <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
        {title}
      </h3>
      
      <p className="text-slate-600 mb-8 max-w-md text-lg">
        {message}
      </p>
      
      {showAction && onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-200"
          size="lg"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          {actionText}
        </Button>
      )}
      
      <div className="mt-8 text-xs text-slate-400 flex items-center gap-2">
        <ApperIcon name="Sparkles" size={14} />
        <span>Start building better habits today</span>
      </div>
    </motion.div>
  )
}

export default Empty