import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 max-w-md mx-auto px-6"
      >
        {/* 404 Icon */}
        <div className="relative">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center">
            <ApperIcon name="Search" size={64} className="text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-error to-error/80 rounded-full p-2">
            <ApperIcon name="X" size={20} className="text-white" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-800">
            Page Not Found
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Looks like this page got lost in the task list! Don't worry, let's get you back to being productive.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-primary/25"
          >
            <ApperIcon name="Home" size={16} className="mr-2" />
            Go Home
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="hover:bg-slate-100"
          >
            <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
            Go Back
          </Button>
        </div>

        {/* Helper Text */}
        <div className="pt-8 text-xs text-slate-400 flex items-center justify-center gap-2">
          <ApperIcon name="Lightbulb" size={14} />
          <span>Try checking your task list instead!</span>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound