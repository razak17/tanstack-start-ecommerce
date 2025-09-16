import { ScriptOnce } from '@tanstack/react-router'
import { clientOnly, createIsomorphicFn } from '@tanstack/react-start'
import { createContext, type ReactNode, useEffect, useState } from 'react'
import { z } from 'zod'

// @see: https://github.com/Balastrong/confhub/blob/src/hooks/useTheme.tsx
const UserThemeSchema = z.enum(['light', 'dark', 'system']).catch('system')
const AppThemeSchema = z.enum(['light', 'dark']).catch('light')

export type UserTheme = z.infer<typeof UserThemeSchema>
export type AppTheme = z.infer<typeof AppThemeSchema>

const themeStorageKey = 'ui-theme'

const getStoredUserTheme = createIsomorphicFn()
  .server((): UserTheme => 'system')
  .client((): UserTheme => {
    const stored = localStorage.getItem(themeStorageKey)
    return UserThemeSchema.parse(stored)
  })

const setStoredTheme = clientOnly((theme: UserTheme) => {
  const validatedTheme = UserThemeSchema.parse(theme)
  localStorage.setItem(themeStorageKey, validatedTheme)
})

const getSystemTheme = createIsomorphicFn()
  .server((): AppTheme => 'light')
  .client((): AppTheme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

const handleThemeChange = clientOnly((userTheme: UserTheme) => {
  const validatedTheme = UserThemeSchema.parse(userTheme)

  const root = document.documentElement
  root.classList.remove('light', 'dark', 'system')

  if (validatedTheme === 'system') {
    const systemTheme = getSystemTheme()
    root.classList.add(systemTheme, 'system')
  } else {
    root.classList.add(validatedTheme)
  }
})

const setupPreferredListener = clientOnly(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = () => handleThemeChange('system')
  mediaQuery.addEventListener('change', handler)
  return () => mediaQuery.removeEventListener('change', handler)
})

const themeScript = (() => {
  function themeFn() {
    try {
      const storedTheme = localStorage.getItem('ui-theme') || 'system'
      const validTheme = ['light', 'dark', 'system'].includes(storedTheme)
        ? storedTheme
        : 'system'

      if (validTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light'
        document.documentElement.classList.add(systemTheme, 'system')
      } else {
        document.documentElement.classList.add(validTheme)
      }
    } catch (e) {
      console.error(e)
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      document.documentElement.classList.add(systemTheme, 'system')
    }
  }
  return `(${themeFn.toString()})();`
})()

type ThemeContextProps = {
  userTheme: UserTheme
  appTheme: AppTheme
  setTheme: (theme: UserTheme) => void
}
export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
)

type ThemeProviderProps = {
  children: ReactNode
}
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [userTheme, setUserTheme] = useState<UserTheme>(getStoredUserTheme)

  useEffect(() => {
    if (userTheme !== 'system') return
    return setupPreferredListener()
  }, [userTheme])

  const appTheme = userTheme === 'system' ? getSystemTheme() : userTheme

  const setTheme = (newUserTheme: UserTheme) => {
    const validatedTheme = UserThemeSchema.parse(newUserTheme)
    setUserTheme(validatedTheme)
    setStoredTheme(validatedTheme)
    handleThemeChange(validatedTheme)
  }

  return (
    <ThemeContext value={{ userTheme, appTheme, setTheme }}>
      {/** biome-ignore lint/correctness/noChildrenProp: false */}
      <ScriptOnce children={themeScript} />

      {children}
    </ThemeContext>
  )
}
