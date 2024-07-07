export function TypographyH1({children}) {
    return (
      <h1 className="scroll-m-20 text-2xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    )
  }
  
  export function TypographyH2({children, className}) {
    return (
      <h2 className={`pb-2 text-xl sm:text-3xl font-semibold tracking-tight first:mt-0 ${className}`}>
        {children}
      </h2>
    )
  }
  
  export function TypographyH3({children}) {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    )
  }
  
  export function TypographyP({children}) {
    return (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {children}
      </p>
    )
  }

  export function TypographyLarge({children, className}) {
    return <div className={`text-lg font-semibold ${className}`}>{children}</div>
  }

  export function TypographySmall({children}) {
    return (
      <small className="text-sm font-medium leading-none">{children}</small>
    )
  }
  