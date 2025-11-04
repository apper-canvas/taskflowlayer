import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const FilterTabs = ({ activeFilter, onFilterChange, taskCounts = {} }) => {
  const filters = [
    {
      key: "all",
      label: "All Tasks",
      icon: "List",
      count: taskCounts.all || 0
    },
    {
      key: "active",
      label: "Active",
      icon: "Clock",
      count: taskCounts.active || 0
    },
    {
      key: "completed",
      label: "Completed",
      icon: "CheckCircle",
      count: taskCounts.completed || 0
    },
    {
      key: "overdue",
      label: "Overdue",
      icon: "AlertTriangle",
      count: taskCounts.overdue || 0
    }
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.key
        return (
          <motion.div key={filter.key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={isActive ? "primary" : "ghost"}
              onClick={() => onFilterChange(filter.key)}
              className={cn(
                "h-10 px-4 rounded-full transition-all duration-200 flex items-center gap-2",
                isActive 
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/25" 
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              )}
            >
              <ApperIcon name={filter.icon} size={16} />
              <span className="font-medium">{filter.label}</span>
              {filter.count > 0 && (
                <span className={cn(
                  "inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full ml-1",
                  isActive 
                    ? "bg-white/20 text-white" 
                    : "bg-primary/10 text-primary"
                )}>
                  {filter.count}
                </span>
              )}
            </Button>
          </motion.div>
        )
      })}
    </div>
  )
}

export default FilterTabs