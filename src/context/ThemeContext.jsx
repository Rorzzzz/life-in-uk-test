'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

function loadTheme() {
  if (typeof window === 'undefined') return 'light'
  try {
    const saved = localStorage.getItem('passport_theme')
    if (saved) return saved
    // No saved preference — respect OS setting, default to light
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // Hydrate from localStorage / system preference after mount
  useEffect(() => {
    setTheme(loadTheme())
  }, [])

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
    try {
      localStorage.setItem('passport_theme', theme)
    } catch {}
  }, [theme])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
