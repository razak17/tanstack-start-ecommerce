import { Link, useRouterState } from '@tanstack/react-router'
import { Heart, Home, ShoppingBag, ShoppingCart } from 'lucide-react'

import { cn, isActiveUrl } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import type { NavItem } from '@/types'

interface MainNavProps {
  items?: NavItem[]
  cartItemsCount?: number
  favoritesCount?: number
}

const iconMap = {
  Home,
  ShoppingBag,
  ShoppingCart,
  Heart,
}

export function MainNav({
  items,
  cartItemsCount = 0,
  favoritesCount = 0,
}: MainNavProps) {
  const routerState = useRouterState()
  const pathname = routerState.location.pathname

  return (
    <div className="hidden gap-6 lg:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {items?.map((item) => {
            const IconComponent = item.icon
              ? iconMap[item.icon as keyof typeof iconMap]
              : null

            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'h-auto',
                    isActiveUrl(pathname, item.url) &&
                      'bg-accent text-accent-foreground',
                  )}
                >
                  <Link to={item.url}>
                    <div className="flex items-center gap-2">
                      {IconComponent && (
                        <IconComponent className="size-4 text-foreground" />
                      )}
                      <span>{item.title}</span>
                    </div>
                    {item.title === 'Cart' && cartItemsCount > 0 && (
                      <Badge className="-right-4 -top-1.5 absolute z-10 h-5 min-w-5 rounded-full px-1 tabular-nums">
                        {cartItemsCount}
                      </Badge>
                    )}
                    {item.title === 'Favorites' && favoritesCount > 0 && (
                      <Badge className="-right-4 -top-1.5 absolute z-10 h-5 min-w-5 rounded-full px-1 tabular-nums">
                        {favoritesCount}
                      </Badge>
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
