import { motion } from "framer-motion"
import TaskManager from "@/components/organisms/TaskManager"
import ApperIcon from "@/components/ApperIcon"

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
          Get Things Done
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Transform your productivity with TaskFlow. Add tasks instantly, track progress effortlessly, and achieve your goals with satisfying visual feedback.
        </p>
        
        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="bg-gradient-to-r from-success/20 to-success/30 p-2 rounded-lg">
              <ApperIcon name="Zap" size={16} className="text-success" />
            </div>
            <span>Instant task creation</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <div className="bg-gradient-to-r from-primary/20 to-primary/30 p-2 rounded-lg">
              <ApperIcon name="Target" size={16} className="text-primary" />
            </div>
            <span>Smart organization</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <div className="bg-gradient-to-r from-secondary/20 to-secondary/30 p-2 rounded-lg">
              <ApperIcon name="TrendingUp" size={16} className="text-secondary" />
            </div>
            <span>Progress tracking</span>
          </div>
        </div>
      </motion.div>

      {/* Task Manager */}
      <TaskManager />
    </div>
  )
}

export default Home