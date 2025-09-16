import { Monitor, Moon, Sun } from 'lucide-react'

import { useTheme } from '@/lib/hooks/use-theme'

import type { UserTheme } from './theme-provider'
import { Button } from './ui/button'

const themes: UserTheme[] = ['light', 'dark', 'system']

// @see: https://github.com/Balastrong/confhub/blob/src/components/theme-selector.tsx
export function ThemeSelector() {
  const { userTheme, setTheme } = useTheme()

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(userTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      aria-label={'Click to cycle themes'}
    >
      <Sun className="light:not-system:inline hidden h-4 w-4" />
      <Moon className="hidden h-4 w-4 dark:not-system:inline" />
      <Monitor className="system:inline hidden h-4 w-4" />
    </Button>
  )
}
