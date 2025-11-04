import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-48 animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-24 animate-pulse" />
      </div>

      {/* Add task form skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse" />
          <div className="h-12 w-12 bg-gradient-to-r from-primary/20 to-primary/30 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-pulse"
            style={{ width: `${60 + i * 15}px` }}
          />
        ))}
      </div>

      {/* Task list skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded border-2 animate-pulse mt-0.5" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse w-1/2" />
                <div className="flex items-center gap-4 pt-2">
                  <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse w-16" />
                  <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse w-20" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse" />
                <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading