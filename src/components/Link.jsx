import { useRouter } from "../hooks/useRoute.jsx"

export function Link({href,children,...restProps}){
  const {navigateTo} = useRouter()

  const handleLink = (event)=>{
    event.preventDefault()

    navigateTo(href)
  }

  return(
    <a href={href} {...restProps} onClick={handleLink}>
      {children}
    </a>
  )
}