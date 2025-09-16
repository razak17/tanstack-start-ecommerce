import { Link, useRouterState } from '@tanstack/react-router'
import type * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { siteConfig } from '@/config/site'
import type { SidebarNavItem } from '@/types'
import { Icons } from '../icons'

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const routerState = useRouterState()
  const pathname = routerState.location.pathname

  const sidebarNav: SidebarNavItem[] = [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'dashboard',
      isActive: pathname === '/admin/dashboard' || pathname === '/admin',
    },
    {
      title: 'Products',
      url: '/admin/products',
      icon: 'product',
      isActive: pathname.includes('/admin/products'),
    },
    {
      title: 'Categories',
      url: '/admin/categories',
      icon: 'category',
      isActive: pathname.includes('/admin/categories'),
    },
    {
      title: 'Subcategories',
      url: '/admin/subcategories',
      icon: 'subcategory',
      isActive: pathname.includes('/admin/subcategories'),
    },
    {
      title: 'Orders',
      url: '/admin/orders',
      icon: 'credit',
      isActive: pathname.includes('/admin/orders'),
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: 'users',
      isActive: pathname.includes('/admin/users'),
    },
    {
      title: 'Analytics',
      url: '/admin/analytics',
      icon: 'analytics',
      isActive: pathname.includes('/admin/analytics'),
    },
    // {
    //   title: "Settings",
    //   url: "/admin/settings",
    //   icon: "settings",
    //   isActive: location.pathname.includes("/admin/settings"),
    // },
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <Link to="/" className="w-full">
        <SidebarHeader className="flex h-14 items-center justify-center border-border/60 border-b p-0">
          <SidebarMenu className="items-center justify-center lg:flex">
            <SidebarMenuItem>
              <span className="font-bold font-mono text-xl">
                {siteConfig.name}
              </span>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Link>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu className="pt-4">
              {sidebarNav.map((item) => {
                const Icon = Icons[item.icon ?? 'chevronLeft']
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={item.isActive}
                      className="px-4 py-6"
                    >
                      <Link to={item.url}>
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
