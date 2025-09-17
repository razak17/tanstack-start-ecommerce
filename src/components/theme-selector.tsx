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

  const getIcon = () => {
    switch (userTheme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'system':
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      aria-label={'Click to cycle themes'}
    >
      {getIcon()}
    </Button>
  )
}
