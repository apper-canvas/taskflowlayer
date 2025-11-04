import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow",
    primary: "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-md hover:shadow-lg hover:shadow-primary/25",
    secondary: "bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white shadow-md hover:shadow-lg hover:shadow-secondary/25",
    success: "bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success text-white shadow-md hover:shadow-lg hover:shadow-success/25",
    danger: "bg-gradient-to-r from-error to-error/90 hover:from-error/90 hover:to-error text-white shadow-md hover:shadow-lg hover:shadow-error/25",
    ghost: "hover:bg-slate-100 text-slate-700 hover:text-slate-900",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 hover:text-slate-900"
  }

  const sizes = {
    sm: "h-8 px-3 text-sm rounded-lg",
    default: "h-10 px-4 py-2 text-sm rounded-lg",
    lg: "h-12 px-6 py-3 text-base rounded-xl",
    icon: "h-10 w-10 rounded-lg"
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform active:scale-95 hover:-translate-y-0.5",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button