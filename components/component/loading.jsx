export default function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center h-screen bg-grey-800">
        <div className="relative w-24 h-24">    
          <div className="absolute top-0 left-0 right-0 bottom-0 border-8 border-textprimaryforeground opacity-10 rounded-full"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 border-8 border-textprimaryforeground border-t-transparent animate-spin rounded-full"></div>
        </div>
      </div>
    )
  }