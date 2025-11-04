import { Outlet } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg">
                <ApperIcon name="CheckSquare" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs text-slate-500">Effortless Task Management</p>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-primary">Today</div>
                <div className="text-slate-500">Stay focused</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2 text-slate-600">
                <ApperIcon name="Sparkles" size={16} className="text-accent" />
                <span>Make it happen</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ApperIcon name="Heart" size={14} className="text-error" />
              <span>Built for productivity enthusiasts</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>© 2024 TaskFlow</span>
              <div className="w-px h-4 bg-slate-300" />
              <span>Simple • Fast • Effective</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout