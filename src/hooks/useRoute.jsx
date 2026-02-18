import { useState, useEffect } from 'react'

export function useRouter(){
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleNav = () => {
      setCurrentPath(window.location.pathname)
      console.log('navegando')
    }

    window.addEventListener('popstate', handleNav)

    return () => {
      window.removeEventListener('popstate', handleNav)
    }
  }, [])

  const navigateTo = (href)=>{
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return { currentPath, navigateTo }
}