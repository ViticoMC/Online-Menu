export default function ButtonAdmin({ children, variant, size, className, ...props }){
    let baseClass = "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
  
    if (variant === "outline") {
      baseClass += " border border-gray-300 hover:bg-gray-100"
    } else {
      baseClass += " bg-pink-500 text-white hover:bg-pink-600"
    }
  
    if (size === "sm") {
      baseClass += " px-3 py-2 text-sm"
    } else {
      baseClass += " px-4 py-2"
    }
  
    baseClass += " " + className
  
    return (
      <button className={baseClass} {...props}>
        {children}
      </button>
    )
  }