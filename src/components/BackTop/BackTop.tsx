import { useEffect, useState } from 'react'
import classes from './BackTop.module.scss'
import clsx from 'clsx'

export default function BackTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the button when the user scrolls down 200px or more
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button className={clsx(classes.backTop, isVisible && classes.visible)} onClick={scrollToTop}>
      <img src='/icons/icon-backtop.png' alt='Back Top' />
    </button>
  )
}
