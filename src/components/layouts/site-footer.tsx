import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

import { siteConfig } from '@/config/site'
import { Icons } from '../icons'
import { Shell } from '../shell'
import { ThemeSelector } from '../theme-selector'
import { buttonVariants } from '../ui/button'

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell>
        <section className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="flex items-center gap-4">
            <Icons.visa className="size-12" />
            <Icons.paypal className="size-12" />
            <Icons.mastercard className="size-12" />
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; copyright {new Date().getFullYear()} - Evershop, All rights
            reserved.
          </p>
        </section>
        <section className="flex flex-col items-center justify-between space-x-4 md:flex-row">
          <div className="text-left text-muted-foreground text-sm leading-loose">
            Built by{' '}
            <Link
              to={siteConfig.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-foreground"
            >
              Razak Mo
              <span className="sr-only">Twitter</span>
            </Link>
            .
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              to={'/privacy'}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to={'/terms'}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms & Conditions
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <Link
              to={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                }),
              )}
            >
              <Icons.gitHub className="size-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </Link>
            <ThemeSelector />
          </div>
        </section>
      </Shell>
    </footer>
  )
}
