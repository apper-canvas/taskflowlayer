import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const DeleteConfirmModal = ({ task, isOpen, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)
    await onConfirm(task.Id)
    setIsDeleting(false)
    onClose()
  }

  if (!isOpen || !task) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md mx-4 overflow-hidden"
        >
          {/* Content */}
          <div className="p-6 text-center">
            <div className="bg-gradient-to-br from-error/10 to-error/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <ApperIcon name="Trash2" size={32} className="text-error" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Delete Task
            </h3>

            <p className="text-slate-600 mb-2">
              Are you sure you want to delete this task?
            </p>

            <div className="bg-slate-50 rounded-lg p-3 mb-6">
              <p className="text-sm font-medium text-slate-800 truncate">
                {task.title}
              </p>
            </div>

            <p className="text-xs text-slate-500 mb-6">
              This action cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleConfirm}
                disabled={isDeleting}
                className="flex-1 bg-gradient-to-r from-error to-error/90 hover:from-error/90 hover:to-error"
              >
                {isDeleting ? (
                  <>
                    <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Trash2" size={16} className="mr-2" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default DeleteConfirmModal