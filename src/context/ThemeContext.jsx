import { createContext, useContext, useState, useEffect } from 'react'
import { THEMES } from '../data/themes'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState('desclub')
  const theme = THEMES.find(t => t.key === activeTheme) || THEMES[0]

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--theme-primary', theme.color)
    root.style.setProperty('--theme-accent', theme.accent)
    root.style.setProperty('--theme-bg', theme.bg)
  }, [activeTheme, theme])

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
